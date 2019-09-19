import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import wkhtmltopdf from 'wkhtmltopdf';

const getPDFStream = async (): Promise<any> => {
  const stream: any = wkhtmltopdf('hello world', { pageSize: 'A4' });
  const chunks = [];
  stream.on("data", chunk => {
    chunks.push(chunk);
  });
  return new Promise((resolve, reject) => {
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
};

process.env["PATH"] = process.env["PATH"] + ":" + process.env["LAMBDA_TASK_ROOT"] + '/bin';

export const generatePdf: APIGatewayProxyHandler = async (event, _context) => {  
  try {
    const pdfStream = await getPDFStream();
    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "Content-type": "application/pdf",
        "accept-ranges": "bytes"
      },
      body: pdfStream.toString("base64")
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
        input: event,
      }, null, 2),
    };
  }
  
}
