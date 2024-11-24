import { AssemblyAI, LemurResponse } from "assemblyai";

const client = new AssemblyAI({
  apiKey: "1655f9078dc34cb6b4adc6c689895a23",
});

const prompt = `This is a random input from a user
                Generate quotes from the transcript in the following format:

                Title: A brief, descriptive title that summarizes the input.
                Quotes: 5 Different quotes that summarizes the overall theme of the input`;

async function testAssemblyAI() {
  try {
    const transcript = await client.transcripts.transcribe({
      audio: "https://assembly.ai/sports_injuries.mp3",
    });

    const transcriptData = await client.transcripts.get(transcript.id);
    // Step 2: Generate action items using LeMUR
    const { response }: LemurResponse = await client.lemur.task({
      input_text: transcriptData.text,
      prompt,
    });

    // Step 3: Log the response
    console.log("Genereated Action Items:", response);
  } catch (error) {
    console.error(
      "Error during transcription or action item generation:",
      error,
    );
  }
}

testAssemblyAI();
