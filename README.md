# serverless-html-to-pdf
Simple test project for converting html pages to pdf using AWS Lambda


> ⚠️ **WARNING**: Make sure /bin/wkhtmltopdf has execution permission(chmod 755). Add the binary path to your language runtime:

`process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';`