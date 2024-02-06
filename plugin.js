const { httpFetch } = Host.getFunctions();

function callOpenAI() {
    const escapedInputJson = Host.inputString();
    
    // Unescape the input JSON string
    const unescapedInputJson = escapedInputJson.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t');

    // Parse the unescaped JSON string
    const input = JSON.parse(unescapedInputJson);
    
    // Prepare the request data
    const requestData = JSON.stringify({
        method: "POST",
        url: `${input.hostUrl}/v1/chat/completions`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${input.apiKey}`
        },
        body: JSON.stringify({
            model: input.model, // Use the passed model name
            messages: input.messages
        })
    });

    // Call the httpFetch host function directly with the serialized request data
    const responseJson = httpFetch(requestData);

    // Output the response JSON string directly, assuming httpFetch handles the request and returns the response
    Host.outputString(responseJson);
}

module.exports = { callOpenAI };
