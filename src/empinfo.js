import React, {useState} from 'react';
import QrReader from 'react-qr-reader'

const EmpInfoForm = () => {
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState("");
    const [scanError, setScanError] = useState({});
    const [canSubmit, setCanSubmit] = useState(false);

    const updateAnswer = (event) => {
        setAnswer(event.target.value);
        if(answer && result) {
            setCanSubmit(true);
        }
    }

    const handleSubmit = (event) => {
        alert('My answer ' + answer);
        event.preventDefault();
    }

    const handleScan = data => {
        if (data) {
            setResult(data);
            alert('Scan success');
        }
        if(answer && result) {
            setCanSubmit(true);
        }
    }
    const handleError = err => {
        console.error(err);
        setScanError(err);
    }

    return (
        <div className="container">
            <form style={{width: '80%'}}>
                <div className="form-group">
                    <label htmlFor="answer">Your answer</label>
                    <input type="text" className="form-control" id="answer" aria-describedby="answerHelp" />
                    <small id="answerHelp" className="form-text text-muted">Your answer for the riddle!!</small>
                </div>
                <div className="form-group">
                    <label htmlFor="answer">QR Code</label>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                    />
                    <small id="qrcodeHelp" className="form-text text-muted">Scan QR code from the letter    </small>
                </div>
                <button type="submit" className="btn btn-primary" disabled={canSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default EmpInfoForm;
