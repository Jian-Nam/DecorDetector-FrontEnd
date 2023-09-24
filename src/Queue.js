class Queue {  
    constructor(autorun = true, queue = []) {
      this.running = false;
      this.autorun = autorun;
      this.queue = queue;
    }
  
    add(cb) {
        return new Promise((res, rej) => {
            this.queue.push((value) => {
                const finished = new Promise(async(resolve, reject) => {
                    const callbackResponse = await cb(value);
            
                    if (callbackResponse !== false) {
                        resolve(callbackResponse);
                    } else {
                        reject(callbackResponse);
                    }
                });
                res(finished);
                finished.then(this.dequeue.bind(this), (() => {}));
            });
    
            if (this.autorun && !this.running) {
                this.dequeue();
            }
        })
    }
  
    dequeue(value) {
        this.running = this.queue.shift();
    
        if (this.running) {
             this.running(value);
        }
    
        return this.running;
    }
  
    get next() {
      return this.dequeue;
    }
  }

  export default Queue