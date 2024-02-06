function callOpenAI() {
    const inputJson = Host.inputString();

    // Just return the input as output
    Host.outputString(inputJson);
    return

    const input = JSON.parse(inputJson);
    
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

