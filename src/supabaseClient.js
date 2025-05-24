// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import stringSimilarity from 'string-similarity'; // ← Dodaj OVO!

const supabaseUrl = 'https://rumqopnpwlvkhdiurlqk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1bXFvcG5wd2x2a2hkaXVybHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NjQyNTMsImV4cCI6MjA2MzE0MDI1M30.MF6Dli4oTfJWvWH_3ObBwlVVrhHIVNSLteoif0PXvBA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// PRAVI dohvat FAQ odgovora!
export async function getFaqAnswer(question, lang = 'hr') {
  const { data, error } = await supabase
    .from('faq')
    .select('*');

  if (error || !data) {
    return { answer: 'Greška prilikom dohvata podataka iz baze.' };
  }

  // Tražimo najbliže pitanje (fuzzy)
  const questions = data.map(item => item.question);
  const { bestMatch } = stringSimilarity.findBestMatch(question, questions);

  if (bestMatch.rating > 0.4) {
    const matched = data.find(item => item.question === bestMatch.target);
    return { answer: matched[`answer_${lang}`] || "Nema odgovora na traženom jeziku." };
  } else {
    return { answer: 'Nažalost, nemam odgovor na to pitanje. Pokušajte drugačije formulirati upit.' };
  }
}

// Ako želiš spremati neodgovorena pitanja:
export async function saveUnansweredQuestion(question, lang = 'hr', user_id = null) {
  const { error } = await supabase
    .from('user_questions')
    .insert([
      {
        question_text: question,
        lang,
        user_id,
      },
    ]);
  return !error;
}
