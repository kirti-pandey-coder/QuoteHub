import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  StatusBar,
} from 'react-native';

export default function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('https://dummyjson.com/quotes/random');

      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }

      const data = await response.json();

      setQuote(data.quote);
      setAuthor(data.author);
    } catch (e) {
      setError('Unable to load quote. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const shareQuote = async () => {
    try {
      await Share.share({
        message: `"${quote}" — ${author}`,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1020" />

      <View style={styles.header}>
        <Text style={styles.title}>QuoteHub</Text>
        <Text style={styles.subtitle}>Daily inspiration for developers</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.quoteMark}>“</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#60A5FA" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <>
            <Text style={styles.quote}>{quote}</Text>
            <Text style={styles.author}>— {author}</Text>
          </>
        )}
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={fetchQuote}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>New Quote</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={shareQuote}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Share Quote</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1020',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  header: {
    marginBottom: 32,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  subtitle: {
    color: '#94A3B8',
    fontSize: 15,
    marginTop: 6,
  },

  card: {
    backgroundColor: '#111827',
    borderRadius: 32,
    padding: 28,
    minHeight: 320,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1F2937',
    elevation: 8,
  },

  quoteMark: {
    color: '#2563EB',
    fontSize: 72,
    fontWeight: '900',
    marginBottom: 8,
    lineHeight: 72,
  },

  quote: {
    color: '#F8FAFC',
    fontSize: 28,
    lineHeight: 42,
    fontWeight: '700',
  },

  author: {
    color: '#94A3B8',
    fontSize: 16,
    marginTop: 28,
    textAlign: 'right',
    fontStyle: 'italic',
  },

  primaryButton: {
    marginTop: 28,
    backgroundColor: '#2563EB',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 6,
  },

  secondaryButton: {
    marginTop: 16,
    backgroundColor: '#059669',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  error: {
    color: '#FCA5A5',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
  },
});