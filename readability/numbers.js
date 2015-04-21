// Javascript program that calculates the first 100 prime numbers.
// Definition: A prime number (or a prime) is a natural number greater than 1 that has no positive 
// divisors other than 1 and itself.

// Return true if n is a prime number.
function isPrime(n) 
{
  for (var i = 2; i < n; i++) 
  {
      if (n % i === 0) return false;
  }
  return true;
}

var numberOfPrimes = 0;
var candidatePrime = 2;

// Calculates the first 100 primes.
while (numberOfPrimes < 100) 
{
    if (isPrime(candidatePrime) === true)
    {
        numberOfPrimes++;
    }
    candidatePrime++;
}