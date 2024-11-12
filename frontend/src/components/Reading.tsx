import { useState, useRef, useEffect } from 'react';
import { Card, CardBody, Button } from '@nextui-org/react';
import { Trash, Send, PlusCircle } from 'react-feather';
import Subcards from './Subcards.tsx';
import axios from 'axios';

interface QuestionAnswer {
  question: string;
  answer: string;
}

async function generateQuestions(text: string): Promise<QuestionAnswer[]> {
  try {
    const response = await axios.post<{ question: string; answer: string }[]>(
      'http://127.0.0.1:8000/generate-questions',
      {
        text: text,
        numQuestions: 5,
      }
    );
    return response.data || [];
  } catch (error) {
    console.error('Error generating questions:', error);
    return [];
  }
}

const Reading: React.FC = () => {
  const [text, setText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Capturing...");
  const [generatedQuestions, setGeneratedQuestions] = useState<QuestionAnswer[]>([]);
  const displayTextRef = useRef<HTMLDivElement | null>(null);
  const inputTextRef = useRef<HTMLTextAreaElement | null>(null);


  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoadingText("Creating Flashcards ...");
      }, 2000);

      // Clear timeout if loading state changes
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const captureVisibleText = () => {
    if (displayTextRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = displayTextRef.current;

      // Get the starting and ending point of the visible text
      const visibleStart = Math.floor((scrollTop / scrollHeight) * text.length);
      const visibleEnd = Math.floor(((scrollTop + clientHeight) / scrollHeight) * text.length);

      // Capture the visible portion of the text
      return text.substring(visibleStart, visibleEnd);
    }
    return "";
  };

  const handleGenerateQuestions = async () => {
    setLoading(true);
    setLoadingText("Capturing...");
    let visible_text = captureVisibleText();
    const questions_answers = await generateQuestions(visible_text);
    console.log(questions_answers);
    setGeneratedQuestions(questions_answers);
    
    // reset the loading text & loading status
    setLoadingText("Capturing...");
    setLoading(false);
  };

  const handleSubmit = () => {
    if (inputTextRef.current) {
      setIsSubmitted(true);
      setText(inputTextRef.current.value);
    }
  };

  const deleteText = () => {
    setText('');
    setIsSubmitted(false);
    setGeneratedQuestions([]);
  };


  return (
    <div className="flex gap-4 p-4 min-h-screen h-screen">
      {/* Left Card for Large Text */}
      <Card className="flex-1 p-6 h-full flex flex-col overflow-hidden" radius="none">
        <div className="flex flex-col gap-2 mb-4">
          {!isSubmitted ? (
            <Button color="warning" variant="flat" onClick={handleSubmit} fullWidth>
              <Send className="mr-2" /> Submit
            </Button>
          ) : (
            <>
              <Button color="warning" variant="flat" onClick={deleteText} fullWidth>
                <Trash className="mr-2" /> Delete
              </Button>
              <Button color="success" variant="flat" onClick={handleGenerateQuestions} fullWidth disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-t-2 border-t-transparent border-current animate-spin rounded-full"></div>
                    <span className="ml-2">{loadingText}</span>
                  </div>
                ) : (
                  <>
                    <PlusCircle className="mr-2" /> Capture & Flashcard Text
                  </>
                )}
              </Button>
            </>
          )}
        </div>
        <CardBody className="flex-1 overflow-auto border border-gray-300 rounded-lg p-4">
        {isSubmitted ? (
        <div
          ref={displayTextRef}
          className="h-full w-full overflow-y-auto"
          style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
        >
          {text}
        </div>
      ) : (
        <textarea
          ref={inputTextRef}
          placeholder="Enter text..."
          className="flex-1 h-full w-full p-4 border border-gray-300 rounded-lg resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      
        </CardBody>
      </Card>

      <Subcards generatedQuestions={generatedQuestions} />
    </div>
  );
};

export default Reading;
