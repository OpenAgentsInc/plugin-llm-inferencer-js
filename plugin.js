function callOpenAI() {
    // const inputJson = Host.inputString();
    // const input = JSON.parse(inputJson);
    // Assuming inputJson has escaped characters
    const escapedInputJson = Host.inputString();
    
    // Attempt to unescape the input JSON string
    // Replace backslashes added by addslashes
    const unescapedInputJson = escapedInputJson.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t');

    // Then parse the unescaped JSON string
    const input = JSON.parse(unescapedInputJson);
    // Just return the input as output
    
    const apiKey = input.apiKey;
    const hostUrl = input.hostUrl;
    const modelName = input.model; // Accept model name as input
    const messages = input.messages;

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    };

    const body = JSON.stringify({
        model: modelName, // Use the passed model name
        messages: messages
    });

    const request = {
        method: "POST",
        url: `${hostUrl}/v1/chat/completions`,
        headers: headers,
        body: body
    };

    const response = Http.request(request);
    if (response.status != 200) {
        Host.outputString(`Received non-200 response: ${response.status}`);
        return
    }

    Host.outputString(response.body);
}

module.exports = { callOpenAI };

