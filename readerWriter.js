

function Writer(){

    writer.lock();
        writerTillFinish.lock();
        readerToWait = readerCounter;
    
            write();
    
        readersToWait = 0;
        writerTillFinish.unlock();
    writer.unlock();
}

function Reader(){
    reader.lock();
        readerCounter++;
        if(readersToWait > 0){// new Writer 
            writerTillFinish.lock();// wait till writer free you 
            writerTillFinish.Unlock();// since it locked writer cant use it so we free it 
        }
    reader.unlock();

    READ();
    
    reader.lock();
        readerCounter--
        readersToWait--;
    reader.unlock();  
}

