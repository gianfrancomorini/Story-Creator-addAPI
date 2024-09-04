import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Oval } from 'react-loader-spinner';

function App() {
    const [storyPrompt, setStoryPrompt] = useState('');
    const [generatedStory, setGeneratedStory] = useState('');
    const [illustration, setIllustration] = useState('');
    const [illustrationStyle, setIllustrationStyle] = useState('cartoonish');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setGeneratedStory('');
        setIllustration('');
        try {
            console.log('Sending request to backend...');
            const response = await axios.post('http://localhost:5000/generate-story', { prompt: storyPrompt });
            console.log('Received response:', response.data);
            setGeneratedStory(response.data.story);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleIllustrate = async () => {
        setIsLoading(true);
        setError(null);
        try {
            console.log('Sending request for illustration...');
            const response = await axios.post('http://localhost:5000/generate-illustration', {
                story: generatedStory,
                style: illustrationStyle
            });
            console.log('Received illustration:', response.data);
            if (response.data.illustration) {
                setIllustration(response.data.illustration);
            } else {
                throw new Error('No illustration data received');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.error || error.message || 'An error occurred while generating the illustration');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>AI Story Creator</h1>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={storyPrompt}
                        onChange={(e) => setStoryPrompt(e.target.value)}
                        placeholder="Enter your story idea here..."
                        rows="4"
                        cols="50"
                    />
                    <br />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Generate Story'}
                    </button>
                </form>
                {generatedStory && (
                    <div className="generated-content">
                        <h2>Generated Story:</h2>
                        <p>{generatedStory}</p>
                        <h3>Illustrate the Story</h3>
                        <select
                            value={illustrationStyle}
                            onChange={(e) => setIllustrationStyle(e.target.value)}
                        >
                            <option value="cartoonish">Cartoonish</option>
                            <option value="realistic">Realistic</option>
                            <option value="whimsical">Whimsical</option>
                        </select>
                        <button onClick={handleIllustrate} disabled={isLoading}>
                            {isLoading ? 'Generating...' : 'Generate Illustration'}
                        </button>
                        {isLoading && (
                            <Oval
                                height={40}
                                width={40}
                                color="#61dafb"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#282c34"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
                        )}
                    </div>
                )}
                {illustration && (
                    <div className="generated-content">
                        <h2>Generated Illustration:</h2>
                        <img src={`data:image/png;base64,${illustration}`} alt="Generated Illustration" />
                    </div>
                )}
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            </header>
        </div>
    );
}

export default App;