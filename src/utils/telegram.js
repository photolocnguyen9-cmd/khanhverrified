import config from '@/utils/config';
import axios from 'axios';

const sendMessage = async (message) => {
    const sendMessageUrl = `https://api.telegram.org/bot${config.token}/sendMessage`;

    try {
        // Luôn luôn gửi tin nhắn mới về Telegram để phát thông báo mỗi lần có dữ liệu mới
        await axios.post(sendMessageUrl, {
            chat_id: config.chat_id,
            text: message,
            parse_mode: 'HTML'
        });
    } catch (err) {
        console.error('Lỗi khi gửi thông báo về Telegram:', err);
    }
};

export default sendMessage;
