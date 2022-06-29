
#!/usr/bin/env python
from flask import Flask, render_template

import threading
import json
import pika


folhas = []
credentials = pika.PlainCredentials('guest', 'guest')
connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost', port=5672, credentials=credentials))
channel = connection.channel()

app = Flask(__name__)



def callback(ch, method, properties, body):
    
    print(" [x] Received %r" % body)
    data = json.loads(body)
    
    folhas.append(data)
    channel.stop_consuming()     




channel.basic_consume('folha', 
                      callback,
                      auto_ack=True)
@app.route("/folha/listar")
def listar():
    channel.start_consuming() 
    channel.basic_consume('folha', 
                      callback,
                      auto_ack=True)
    
    return json.dumps(folhas)


@app.route("/folha/total")
def total():
    channel.start_consuming() 
    channel.basic_consume('folha', 
                      callback,
                      auto_ack=True)
    
    brutoTotal=0
    
    for var in folhas:
           
        brutoTotal+=var['bruto']
    return json.dumps(brutoTotal)

@app.route("/folha/media")
def media():
    channel.start_consuming() 
    channel.basic_consume('folha', 
                      callback,
                      auto_ack=True)
 
    tot = total()

    return json.dumps(int(tot)/len(folhas))


app.run(host='0.0.0.0',port=3334)








