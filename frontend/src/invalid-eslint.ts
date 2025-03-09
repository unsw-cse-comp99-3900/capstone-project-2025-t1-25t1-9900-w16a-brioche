// This file intentionally causes an ESLint error for testing purposes.
// The following code references an undefined variable, which should trigger an error.
function testError(): void {
  // @ts-ignore
  const x: any = 5
  x = 10 // This will trigger an ESLint error for reassigning a const
}

testError()
