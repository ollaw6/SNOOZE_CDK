# Lambda Function Handler
import numpy as n
import pandas as pd 
import boto3
import soundfile as sf

def handler(event,context):
    s3Client = boto3.client('s3')
    bucket = s3Client.list_objects(
        Bucket = 'rhymedust'
    )
    for item in bucket['Contents']:
        wav = item['Key']
        print(wav)
        y, sr = sf.read(wav)
        print(y.shape, y.dtype, sr)     


    return {'statusCode':200, 'body':'SLAY'}