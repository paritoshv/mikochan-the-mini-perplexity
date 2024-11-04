import axios from "axios";
import OpenAI from "openai";


async function search(req, res){
    const { prompt } = req.query;
    try {
        const googleResults = await fetchGoogleSearchResults(prompt);
        // console.log('Google Search Results:', googleResults);

        const summarizedResults = await summarizeWithOpenAI(googleResults, prompt);
        res.status(200).json({ summarizedResults });
    } catch (error) {
        console.log('Failed to process search:', error);
        res.status(400).json({ error: 'Failed to process search' });
    }
};

async function fetchGoogleSearchResults(query) {
    const url = 'https://www.googleapis.com/customsearch/v1';
    const params = {
        key: process.env.GOOGLE_API_KEY,
        cx: process.env.GOOGLE_ACCOUNT_ID,
        q: query
    };

    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.log('Error fetching Google Search results:', error);
        throw error;
    }
}

async function summarizeWithOpenAI(googleResults, prompt) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const textsToSummarize = googleResults.items.map(item => `${item.title}: ${item.snippet}`).join('\n\n');

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant tasked with summarizing search results into a single cohesive summary followed by concise entries. Do consider the original promt given by user to summarise, supplied as 'originalPrompt'" },
                { role: "user", content: `Summarize: ${textsToSummarize} originalPrompt: ${prompt}` }
            ],
        });

        const content = completion.choices[0].message.content;
        const summaries = content.split('\n\n');  // Assume summaries are separated by double newlines

        // Assuming the first entry is the overall summary
        const overallSummary = summaries.shift(); // Removes and returns the first element (overall summary)
        
        const detailedSummaries = summaries.map((summary, index) => ({
            title: googleResults.items[index].title,
            link: googleResults.items[index].link,
            summary
        }));

        return { overallSummary, detailedSummaries };
    } catch (error) {
        console.log('Error summarizing with OpenAI:', error);
        throw new Error('Failed to summarize search results.');
    }
}
export default { search };