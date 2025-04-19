/*
BigQueryAPIを呼び出すPOSTリクエストのエンドポイント
*/

import { BigQuery } from '@google-cloud/bigquery';
import { v4 as uuidv4 } from 'uuid';
import type { Request, Response } from 'express';

export const insertToBigQuery = async (req: Request, res: Response) => {
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    const { uuid, stamp_id } = req.body;
    if (!uuid || !stamp_id) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    const bigquery = new BigQuery();
    const datasetId = 'stamp_card';
    const tableId = 'stamped_log';

    const rows = [{
        insertId: uuidv4(),
        json: {
            uuid,
            stamp_id,
            stamped_at: new Date().toISOString(),
        },
    }];

    try {
        const [response] = await bigquery
            .dataset(datasetId)
            .table(tableId)
            .insert(
                rows,
                { raw: true, ignoreUnknownValues: true }
            );
        res.status(200).json({ status: 'ok', response });
    } catch (err: any) {
        console.error('Insert error:', err);
        res.status(500).json({ status: 'error', error: err.message });
    }
};
