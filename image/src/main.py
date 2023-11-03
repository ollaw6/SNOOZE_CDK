# Lambda Function Handler
import numpy as n
import pandas as pd 
import boto3


def handler(event,context):
    s3Client = boto3.client('s3')
    bucket = s3Client.list_objects(
        Bucket = 'rhymedust'
    )
    for item in bucket['Contents']:
        print(item['Key'])


    return {'statusCode':200, 'body':'SLAY'}