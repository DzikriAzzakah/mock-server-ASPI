const express = require('express');
const app = express();
const port = 3003;

const crypto = require('crypto');
const fs = require('fs');

// Read the public key from a file
const publicKey = fs.readFileSync('snap_bjb_pub.pem');

// Function to verify the x-signature
function verifySignature(timestamp, signatureHex) {
    const data = `05191866-3fb9-4fe8-8695-61950c4b6be6|${timestamp}`;

    // Convert the hexadecimal signature directly to a Buffer
    const signatureBuffer = Buffer.from(signatureHex, 'hex');

    // Verify the signature
    const isVerified = crypto.verify(
        'RSA-SHA256',
        Buffer.from(data),
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        signatureBuffer
    );

    return isVerified;
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic GET endpoint
app.post('/api/v1/access-token/b2b', (req, res) => {
    // Get request headers
    const headers = req.headers;
    // Get request body
    const body = req.body;

    // Log headers and body
    // console.log('===== Access Token =====');
    // console.log('Request Headers:', headers);
    // console.log('Request Body:', body);
    res.status(200).send({
        "responseCode": "2007300",
        "responseMessage": "Successful",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZjFmM2Q3ZS1kOTA3LTRkOWItODJlNC02Y2IxZGYxOTBlOWUiLCJjbGllbnRJZCI6IjZhZTk1N2M0LTI4NjMtNDcxMy1hY2NlLWJhMTJkZTYzNmNmYyIsIm5iZiI6MTYxMTQ2ODg1NiwiZXhwIjoxNjExNDY5NzU2LCJpYXQiOjE2MTE0Njg4NTZ9.-7HRhcyEh4y0qsG2H3DRdu0AeYv3MEJHfWRKhRBYcNU",
        "tokenType": "Bearer",
        "expiresIn": "900",
        "additionalInfo": {}
    });
});

app.post('/api/v1.0/account-inquiry-internal', (req, res) => {
    console.log("Account Inquiry Internal");
    console.log(Date.now());
    
    
    // Get request headers
    const headers = req.headers;

    // Get request body
    const body = req.body;

    // Log headers and body
    // console.log('===== Internal Inquiry =====');
    // console.log('Request Headers:', headers);
    // console.log('Request Body:', body);
    res.status(200).send(
        {
            "responseCode":"2001500", 
            "responseMessage":"Request has been processed successfully", 
            "partnerReferenceNo":body.partnerReferenceNo, 
            "beneficiaryAccountName":"Yories Yolanda",
            "beneficiaryAccountNo":body.beneficiaryAccountNo,
            "additionalInfo":{
               "idUser": "14045"
            }
        }         
    );
});

app.get('/api/v1.0/payment-billing-bulk', (req, res) => {
    // Get request headers
    const headers = req.headers;

    // Get request body
    const body = req.body;

    // Log headers and body
    console.log('===== Tax Bulk =====');
    console.log('Request Headers:', headers);
    console.log('Request Body:', body);
    res.send({
        "partnerBulkId": body.partnerBulkId,
        "partnerReferenceNo": "GTR79MNJ3R1K3ZFNEAQPS48WZHLWW",
        "responseCode": "2009100",
        "responseMessage": "Request has been processed successfully",
        "serviceCode": "91",
     }
    )
});

app.post('/api/v1.0/transfer-interbank-bulk', (req, res) => {
    // Get request headers
    const headers = req.headers;

    // Get request body
    const body = req.body;

    // Log headers and body
    console.log('===== Interbank Bulk =====');
    console.log(Date.now());
    // console.log('Request Headers:', headers);
    console.log('Request Body:', body);
    res.send({
        "responseCode": "2002000",
        "responseMessage": "Request has been processed successfully",
        "bulkID": body.partnerBulkId,
        "partnerBulkId ": body.partnerBulkId,
    }
    )
});

app.post('/api/v1.0/transfer-deduction-bulk', (req, res) => {
    // Get request headers
    const headers = req.headers;

    // Get request body
    const body = req.body;

    // Log headers and body

    // console.log('===== Ded Bulk =====');
    // console.log('Request Headers:', headers);
    // console.log('Request Body:', body);
    res.send({
        "responseCode": "2029200",
    })
});

app.post('/api/v1.0/billing-inquiry', (req, res) => {
    const headers = req.headers;

    // Get request body
    const body = req.body;

    // Log headers and body

    // console.log('===== Billing Inquiry =====');
    // console.log('Request Headers:', headers);
    // console.log('Request Body:', body);
    res.send({
        "responseCode": "2009000",
        "responseMessage": "Request has been processed successfully",
        "partnerReferenceNo": body.partnerReferenceNo,
        "billingCode": body.billingCode,
        "ntpn": "XGZMFQLCMYTDAZS5",
        "ntb": "126406374699019",
        "npwp": "7414144114230009",
        "amount": {
          "value": "1000000",
          "currency": "IDR"
        }
     })
})

app.post('/api/v1.0/transfer/status', (req, res) => {
    const headers = req.headers;

    // Get request body
    const body = req.body;

    // Log headers and body

    // console.log('===== Cek Status Transfer =====');
    // console.log('Request Headers:', headers);
    // console.log('Request Body:', body);

    res.send({
        "responseCode": "2003600",
        "responseMessage": "Request has been processed successfully",
        "latestTransactionStatus": "00",
        "originalPartnerReferenceNo": body.originalPartnerReferenceNo,
        "beneficiaryBankCode": "110",
        "beneficiaryAccountNo": "888801000157508",
        "sourceAccountNo":"888801000157508",
        "referenceNumber":"10052019",
        "serviceCode": "20",
        "amount": {
            "value": "1000000",
            "currency": "IDR"
        },
        "additionalInfo": {
            "codeArea": "8",
        }
    })
})

app.post('/api/v1.0/tax/status', (req, res) => {
    const headers = req.headers;

    // Get request body
    const body = req.body;

    // Log headers and body

    console.log('===== Cek Status tax =====');
    console.log('Request Headers:', headers);
    console.log('Request Body:', body);

    res.send({
        "originalPartnerReferenceNo": body.originalPartnerReferenceNo,
        "responseCode": "2009400",
        "responseMessage": "Request has been processed successfully",
        "latestTransactionStatus": "00",
        "serviceCode": "91",
        "billingCode": "126406374699019",
        "ntpn": "XGZMFQLCMYTDAZS5",
        "ntb": "126406374699019",
        "amount": {
            "value": "1000000",
            "currency": "IDR"
        }
    })
})

app.post('/api/v1.0/deduction/status', (req, res) => {
    const headers = req.headers;

    // Get request body
    const body = req.body;

    // Log headers and body

    // console.log('===== Cek Status Transfer =====');
    // console.log('Request Headers:', headers);
    // console.log('Request Body:', body);

    res.send({
        "originalPartnerReferenceNo": "GTR79MNJ3R1K3ZFNEAQPS48WZHLWW",
        "responseCode": "2009300",
        "responseMessage": "Request has been processed successfully",
        "latestTransactionStatus": "00",
        "serviceCode": "92",
        "taxDeductionName": "iuran_wajib_pegawai_1persen",
        "amount": {
            "value": "1000000",
            "currency": "IDR"       
        }
    })
})

app.post('/unautohrized', (req, res) => {
    res.status(401).send({
        responseCode: "4012000",
        name: "Dzikri"
    })
})

app.get('/testing', (req, res) => {
    res.status(200).send({
        responseCode: "2001500"
    })
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});