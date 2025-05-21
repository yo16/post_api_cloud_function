# post_api_cloud_function
GCPのCloudFunctionを使ったAPIサーバー（POST１つだけ）機能

## デプロイ方法（備忘録）
Google Cloud SDKのコマンドを使用する。

```
cd gcp-bq-api

gcloud functions deploy insertToBigQuery --gen2 --runtime=nodejs20 --region=us-central1 --source=. --entry-point=insertToBigQuery --trigger-http --allow-unauthenticated
```
