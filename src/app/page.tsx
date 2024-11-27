'use client';

import { useState, ChangeEvent, FormEvent} from 'react';
import { Box, Card, TextField, Button, Typography, Alert } from '@mui/material';
import PhoneInput from 'react-phone-number-input'; // Importing the PhoneInput component
import 'react-phone-number-input/style.css';
import { useRouter } from 'next/navigation';



export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [inputs, setInputs] = useState([{ phoneNumber: '', name: '', task: '' }]);
  const router = useRouter(); 


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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!inputs.every(input => input.phoneNumber && input.name && input.task)) {
      alert('Please provide both phone number, name, and task for each entry');
      return;
    }
    setError(null);

    const data = 
      inputs.map(input => ({
        phone: input.phoneNumber,
        name: input.name,
        task: input.task,
      }))
      sessionStorage.setItem('formData', JSON.stringify(data));
      router.push('/response');
  };

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', padding: 2, }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: 1000, padding: 3, boxShadow: 3, height: '80vh', position: 'relative' }}>
        {
          <>
            <Typography variant="h5" fontWeight={'bold'} align="center" gutterBottom>
            AI Voice Calls
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

                      {/* <IconButton
                        onClick={handleAddRow}
                        sx={{ color: 'black', padding: 1, marginLeft: 1 }}
                      >
                        <AddIcon />
                      </IconButton> */}
                      <Box sx={{marginTop:'15px', textAlign:'center'}}>
                      <Button variant="contained"  onClick={handleAddRow} >Add</Button>
                      </Box>
                    </Box>
                    <TextField
                      label="Task"
                      variant="outlined"
                      value={input.task}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, 'task', e.target.value)}
                      required
                      sx={{ borderRadius: 2, width: '86%' }}
                    />
                  </Box>
                ))}
              </Box>

              <Button type="submit" variant="contained" sx={{ marginBottom: 2, width: '86%', }}>
                Submit
              </Button>
            </form>

            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }} role="alert" aria-live="assertive">
                {error}
              </Alert>
            )}
          </>
        }
      </Card>
    </Box>
    </>
  );
}
