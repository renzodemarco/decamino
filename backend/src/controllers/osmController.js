import { getOsmData } from '../services/osmService.js';

export const getOsmDataController = async (req, res) => {
    try {
        const data = await getOsmData(req.query.q);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}