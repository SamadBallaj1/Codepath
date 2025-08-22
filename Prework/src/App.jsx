import React, { useEffect } from 'react';
import { supabase } from './client';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Fetched creators:', data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Creatorverse</h1>
    </div>
  );
}

export default App;
