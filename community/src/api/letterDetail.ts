import axios from 'axios';

interface User {
    id: string;
    username: string;
    // other user fields
}

interface Message {
    id: string;
    content: string;
    // other message fields
}

interface Letter {
    letter: Message;
    fromUser: User;
}

interface Page {
    current: number;
    pageSize: number;
    total: number;
}

interface LetterDetailResponse {
    conversationId: string;
    page: Page;
    letters: Letter[];
    targetUser: User;
}

const fetchLetterDetail = async (conversationId: string): Promise<LetterDetailResponse> => {
    try {
        const response = await axios.get('/site/letter-detail', {
            params: { conversationId }
        });

        const data = response.data;

        return {
            conversationId: data.conversationId,
            page: data.page,
            letters: data.letters,
            targetUser: data.targetUser
        };
    } catch (error) {
        console.error('Error fetching letter detail:', error);
        throw error;
    }
};

export default fetchLetterDetail;