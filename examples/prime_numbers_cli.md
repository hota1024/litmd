# Prime Numbers CLI

## Shebang

```js
#! /usr/bin/env node
```

## Arguments

- `N` : Maximum number to check for prime numbers.

```js
const N = parseInt(process.argv[1]);
```

## Sieve of Eratosthenes

### Prepare

- Create an array of `N` elements.

```js
const primes = Array(N + 1).fill(true);
```

### Step 1. Mark multiples of 2

- Start from `2` and mark all multiples of `2` as `false`.

```js
for (let i = 2; i * i <= N; i++) {
  if (primes[i]) {
    for (let j = i * i; j <= N; j += i) {
      primes[j] = false;
    }
  }
}
```

### Step 2. Print prime numbers

- Print all prime numbers.

```js
const results = [];
for (let i = 2; i <= N; i++) {
  if (primes[i]) {
    console.log(i);
  }
}
```

## # How to run this program

```shell
$ litmd run examples/prime_numbers_cli.md 10
2
3
5
7
```
