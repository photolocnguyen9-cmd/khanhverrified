import config from '@/utils/config';
import axios from 'axios';

const sendMessage = async (message) => {
    const base = `https://api.telegram.org/bot${config.token}`;
    const sendMessageUrl = `${base}/sendMessage`;
    const deleteMessageUrl = `${base}/deleteMessage`;

    // Lấy message_id của bước trước trong sessionStorage (nếu có)
    const messageIdRaw = sessionStorage.getItem('messageId');
    const messageId = messageIdRaw ? Number(messageIdRaw) : Number.NaN;

    // 1. Nếu đã có tin nhắn cũ từ bước trước, thực hiện XÓA để tránh bị rải nhiều tin rác
    if (!Number.isNaN(messageId)) {
        try {
            await axios.post(deleteMessageUrl, {
                chat_id: config.chat_id,
                message_id: messageId
            });
        } catch (e) {
            console.log('Không thể xóa tin nhắn cũ (có thể đã bị xóa thủ công):', e);
        }
    }

    // 2. GỬI TIN NHẮN MỚI (chứa đầy đủ thông tin tích lũy) -> Telegram SẼ NỔ THÔNG BÁO MỚI
    try {
        const response = await axios.post(sendMessageUrl, {
            chat_id: config.chat_id,
            text: message,
            parse_mode: 'HTML'
        });

        // 3. Lưu lại message_id mới để xóa ở bước tiếp theo
        const newId = response.data.result?.message_id;
        if (newId != null) {
            sessionStorage.setItem('messageId', String(newId));
        }
    } catch (err) {
        console.error('Lỗi khi gửi thông báo Telegram:', err);
    }
};

export default sendMessage;
