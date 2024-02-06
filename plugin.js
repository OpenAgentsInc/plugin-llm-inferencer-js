function callOpenAI() {
    // Input should be a JSON string that includes the API key, host URL, model name, and prompts
    const inputJson = Host.inputString();
    const input = JSON.parse(inputJson);
    
    const apiKey = input.apiKey;
    const hostUrl = input.hostUrl;
    const modelName = input.modelName;
    const prompt = input.prompt;

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    };

    const body = JSON.stringify({
        model: modelName,
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
    });

    const request = {
        method: "POST",
        url: `${hostUrl}/v1/engines/${modelName}/completions`,
        headers: headers,
        body: body
    };

    const response = Http.request(request);
    if (response.status != 200) {
        throw new Error(`Received non-200 response: ${response.status}`);
    }

    // Assuming the response body is the desired output, directly outputting it
    // You might need to parse and format the response body depending on your requirements
    Host.outputString(response.body);
}

module.exports = { callOpenAI };

