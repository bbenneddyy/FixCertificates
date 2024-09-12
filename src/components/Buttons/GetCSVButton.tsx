"use client";

import { getParticipantData } from "@/utils/data";

interface ParticipantData {
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  education: string;
  reason: string | null;
  question1 : string | null;
  question2 : string | null;
  question3 : string | null;
  question4 : string | null;
  question5 : string | null;
  question6 : string | null;
}

export default function GetCSVButton() {
  // Helper function for converting json to csv
  function jsonToCsv(jsonData: ParticipantData[]): string {
    let csv = '';
    // Get the headers
    const headers: (keyof ParticipantData)[] = ['title', 'firstname', 'lastname','education', 'email', 'phone', 'reason', 'question1', 'question2', 'question3', 'question4', 'question5', 'question6'];
    csv += headers.join(',') + '\n';
    // Add the data
    jsonData.forEach(function (row: ParticipantData) {
      let data = headers.map(header => JSON.stringify(row[header])).join(','); // Add JSON.stringify statement
      csv += data + '\n';
    });
    return csv;
  }
  async function handleClick() {
    const currentTime = new Date().toISOString();
    const participantData = await getParticipantData()

    if (!participantData) {
      console.error("No participant data available.");
      return;
    }
    
    const csvData = jsonToCsv(participantData);
    // Create a CSV file and allow the user to download it
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converse_participant_data_${currentTime}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  return (
    <>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        onClick={() => handleClick()}
      >
        Export CSV
      </button>
    </>
  )
}
