'use client';

import { useState, ChangeEvent, FormEvent, useEffect, useCallback } from 'react';
import { Box, Card, TextField, Button, CircularProgress, Typography, Alert, IconButton } from '@mui/material';
import PhoneInput from 'react-phone-number-input'; // Importing the PhoneInput component
import 'react-phone-number-input/style.css';
import AddIcon from '@mui/icons-material/Add';



export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string>();
  const [joke, setJoke] = useState<string>('');
  const [inputs, setInputs] = useState([{ phoneNumber: '', name: '', task: '' }]);


  // List of jokes for the loading screen
  const jokes = [
    "Why did the phone go to therapy? It couldn’t handle the calls.",
    "Why do phones never get lost? They always know their way home.",
    "My phone's on silent. It must be tired of hearing me talk.",
    "Why did the smartphone break up with the landline? It needed more space.",
    "My phone was acting up. I guess it just needed a little reboot.",
    "Why don't phones ever gossip? They don't want to get caught in the wire.",
    "What did the phone say to the charger? You’re the current of my life!",
    "What did the phone say to the call waiting? 'You’ve got to be kidding me.'",
    "Why did the cell phone go to school? It wanted to improve its coverage.",
    "How do you make a phone laugh? Tell it a 'cell-fie' joke!",
    "What’s a phone’s favorite type of music? Anything with good reception.",
    "Why did the telephone break up? They just couldn’t connect anymore.",
    "Why did the mobile phone go to the doctor? It had low battery.",
    "Why did the phone hate the internet? It was always buffering.",
    "What do you call a phone that can’t stop talking? A chatterbox.",
    "Why was the smartphone so great at the party? It always had the best connections.",
    "What do you call a group call with friends? A connection session.",
    "Why did the mobile phone always bring a pencil to the call? In case it needed to take notes.",
    "Why do phone calls never go to the gym? They can’t get enough reception.",
    "What do you get when you cross a phone and a joke? A call you can't stop laughing at.",
    "What’s a mobile phone’s favorite sport? Ping pong, it loves getting calls!",
    "Why do phones make terrible comedians? They just can’t make the connection.",
    "What do you call a phone that can’t hold a conversation? A dial tone.",
    "Why did the phone refuse to talk? It was on mute.",
    "Why was the smartphone so good at relationships? It knew how to call things off.",
    "What did the phone say to the busy signal? 'You’re really tied up, aren’t you?'",
    "Why do phones never tell secrets? They always drop the call.",
    "What do you call it when your phone refuses to pick up? A missed opportunity.",
    "What’s a phone’s favorite horror movie? The Call!",
    "Why don't phones ever get cold? They always have good reception.",
    "Why did the smartphone go to art school? It wanted to improve its interface.",
    "What’s the worst part about making a voice call? Trying to keep a good connection.",
    "Why did the telephone never argue? It knew how to hang up gracefully.",
    "What’s a phone’s favorite way to relax? Taking a screen break.",
    "Why was the phone always happy? It was always in a good mood when it got a text.",
    "What did the phone say to its partner? 'Let’s not text and drive!'",
    "Why are phones always calm? They know how to call things off.",
    "Why did the cell phone get promoted? It had excellent service.",
    "What do you call a bad phone connection? A dropped call.",
    "Why did the smartphone get into trouble? It didn’t know how to turn things off.",
    "Why do phones always have the best advice? Because they’re full of contacts.",
    "What do you call a group chat full of phones? A cell-ebration.",
    "Why did the phone get in trouble at school? It kept sending texts during class.",
    "What do you get when you cross a phone and a cat? A mobile fur-rier.",
    "Why did the mobile phone turn to its GPS? It needed directions in life.",
    "What do you get when you cross a phone with a comedian? A stand-up call.",
    "Why was the phone always so confident? It had great reception.",
    "Why did the phone take a break from texting? It was feeling a little too tapped out.",
    "What did the phone say to its friend? 'I’ve got a good connection!'",
    "Why did the cell phone join a band? It wanted to be in the spotlight.",
    "Why did the mobile phone go to jail? For texting while driving.",
    "Why did the smartphone never get lost? It had a great GPS system.",
    "What do you call a phone call with no service? A lonely conversation.",
    "Why did the mobile phone fail its exam? It couldn’t get through the questions.",
    "What did the phone say to the Wi-Fi? 'You complete me.'",
    "Why did the phone go on a diet? It was losing too many calls.",
    "What do you call a conversation with no connection? A silent treatment.",
    "Why do phones never get stuck in traffic? They’re always in the fast lane.",
    "What do you call a phone that won’t talk? A mute-ual friend.",
    "Why do smartphones make terrible detectives? They can’t keep a low profile.",
    "What do you get when you cross a smartphone and a calendar? An appointment for a call.",
    "Why did the smartphone need a break? It was feeling overloaded.",
    "Why did the mobile phone stay up all night? It was waiting for an important call.",
    "What do you call a phone with no battery? A brick.",
    "Why did the phone always feel so popular? It was always in touch.",
    "Why was the phone always worried? It had too many missed calls.",
    "Why did the smartphone go to the beach? To catch some waves.",
    "What did the phone say when it saw a missed call? 'Oops, my bad!'",
    "Why was the telephone always calm? It knew how to hang up peacefully.",
    "What’s a phone’s favorite kind of exercise? Running apps.",
    "Why did the mobile phone hate the library? It couldn’t get good reception.",
    "What do you call a phone that tells jokes? A pun-demic!",
    "Why was the cell phone so good at sports? It had a great signal.",
    "Why did the phone go to the bank? To check its balance.",
    "What’s a phone’s favorite type of humor? Puns.",
    "What did the phone say when it couldn’t find its charger? 'I’m powerless!'",
    "Why did the phone feel embarrassed? It couldn’t make a call without dropping it.",
    "What’s a phone’s favorite vacation spot? Anywhere with good coverage.",
    "Why did the mobile phone break up with the charger? It felt drained.",
    "What do you call a phone that's always late? A dial-up connection.",
    "Why did the smartphone need glasses? It couldn’t read the small print.",
    "What did the phone say when it was out of battery? 'I’m feeling drained!'",
    "Why did the cell phone go to the doctor? It had a serious case of lag.",
    "What did the phone say when it missed a call? 'I’ll call you back later.'",
    "Why did the phone feel unappreciated? It was always on silent.",
    "Why don’t phones play poker? Because they can’t keep a straight face.",
    "What did the phone say to its user? 'Stop texting, you’re driving me crazy!'",
    "What did the phone say to the lost signal? 'I’m feeling disconnected!'",
    "Why was the smartphone always so neat? It had a clean interface.",
    "Why did the phone go on a diet? It wanted to slim down its data usage.",
    "What’s a phone’s favorite holiday? Talk like a pirate day!",
    "Why did the phone start a band? It wanted to make some calls and hit the right notes!",
    "What did the smartphone say to the outdated phone? 'You need to upgrade!'"
  ];


  const handleInputChange = (index: number, field: 'phoneNumber' | 'name' | 'task', value: string) => {
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index][field] = value;
      return newInputs;
    });
  }; 

  const handleAddRow = () => {
    if (inputs[inputs.length - 1].phoneNumber && inputs[inputs.length - 1].task && inputs[inputs.length - 1].name) {
      setInputs([...inputs, { phoneNumber: '', name: '', task: '' }]);
    } else {
      alert('Please fill the current row before adding a new one.');
    }
  };


  const getRandomJoke = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
  }, [jokes]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!inputs.every(input => input.phoneNumber && input.name && input.task)) {
      alert('Please provide both phone number, name, and task for each entry');
      return;
    }

    setIsLoading(true);
    setError(null);
    setJoke(getRandomJoke());

    const data = 
      inputs.map(input => ({
        phone: input.phoneNumber,
        name: input.name,
        task: input.task,
      }))
    

    try {
      const res = await fetch('http://ec2-54-245-183-42.us-west-2.compute.amazonaws.com:5000/process_call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to process the request.');
      }

      const result = await res.text()
      console.log('Result:', result); 
      setResponse(result);
    } catch (err) {
      console.error('Error occurred:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let jokeInterval: NodeJS.Timeout;

    if (isLoading) {
      jokeInterval = setInterval(() => {
        setJoke(getRandomJoke());
      }, 8000);

      if (typeof speechSynthesis !== "undefined" && joke) {
        const utterance = new SpeechSynthesisUtterance(joke);
        speechSynthesis.speak(utterance);
      }
    }
    return () => {
      clearInterval(jokeInterval);
      if (typeof speechSynthesis !== "undefined") {
        speechSynthesis.cancel();
      } 
    };
  }, [isLoading, joke,getRandomJoke]);

  return (
    <>
    {response ? (
      <>
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Response
        </Typography>
          <div 
          style={{
            fontSize: '16px',  
            lineHeight: '1.5',  
            padding: '20px',  
            margin: '0 auto',  
            maxWidth: '90%',    
            wordBreak: 'break-word', 
            overflow:'auto',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            maxHeight: '100vh', 
          }}
          dangerouslySetInnerHTML={{ __html: response }} />
        </div>
      </>
    ) :
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', padding: 2, }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: 1000, padding: 3, boxShadow: 3, height: '90vh', position: 'relative' }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
            <CircularProgress />
            <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
              {joke}
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Infogen - Task Submission
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ maxHeight: '60vh', overflowY: 'auto', width: '100%' ,  
            //   '&::-webkit-scrollbar': {
            //   display: 'none',
            // },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            }}>
                {inputs.map((input, index) => (
                  <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 2, width: '100%', }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <PhoneInput
                        international
                        defaultCountry="IN" // Default country set to India
                        value={input.phoneNumber}
                        onChange={(value) => handleInputChange(index, 'phoneNumber', value || '')}
                        required
                        className="custom-phone-input"
                        style={{ width: '100%',  marginTop:'8px' }}
                      />
                      <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={input.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, 'name', e.target.value)}
                        required
                        sx={{ borderRadius: 2, height: '56px', marginTop:1 }}
                      />

                      <IconButton
                        onClick={handleAddRow}
                        sx={{ color: 'black', padding: 1, marginLeft: 1 }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <TextField
                      label="Task"
                      variant="outlined"
                      value={input.task}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, 'task', e.target.value)}
                      required
                      sx={{ borderRadius: 2, width: '89%' }}
                    />
                  </Box>
                ))}
              </Box>

              <Button type="submit" variant="contained" sx={{ marginBottom: 2, width: '89%', }} disabled={isLoading}>
                Submit
              </Button>
            </form>

            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }} role="alert" aria-live="assertive">
                {error}
              </Alert>
            )}
          </>
        )}
      </Card>
    </Box>}
    </>
  );
}
