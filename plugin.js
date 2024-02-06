const { httpFetch } = Host.getFunctions();

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
    
    // const apiKey = input.apiKey;
    // const hostUrl = input.hostUrl;
    const modelName = input.model; // Accept model name as input
    const messages = input.messages;

        // Serialize your request data into a JSON string
    const requestData = JSON.stringify({
        model: modelName,
        messages
        // Include other necessary request details such as headers
    });

    // Store the request data in memory
    let requestMemory = Memory.fromString(requestData);

    // Call the httpFetch host function with the memory offset
    let responseOffset = httpFetch(requestMemory.offset);

    // Find the response in memory and read it as a string
    let responseMemory = Memory.find(responseOffset);
    let response = responseMemory.readString();

    // Process the response
    // Note: You might need to handle JSON parsing, error checking, etc.

    // Output the response or process it further as needed
    Host.outputString(response);

    // const headers = {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${apiKey}`
    // };

    // const body = JSON.stringify({
    //     model: modelName, // Use the passed model name
    //     messages: messages
    // });

    //   const request = {
    // method: "GET",
    // url: "https://jsonplaceholder.typicode.com/todos/1"
  // }
  // const response = Http.request(request)
  // if (response.status != 200) throw new Error(`Got non 200 response ${response.status}`)
  // Host.outputString(response.body)
    // return

    // const request = {
    //     method: "POST",
    //     url: `${hostUrl}/v1/chat/completions`,
    //     headers: headers,
    //     body: body
    // };

    // const response = Http.request(request);
    // if (response.status != 200) {
    //     Host.outputString(`Received non-200 response: ${response.status}`);
    //     return
    // }

    // Host.outputString(response.body);
}

module.exports = { callOpenAI };

