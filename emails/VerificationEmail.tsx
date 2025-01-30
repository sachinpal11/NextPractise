import * as React from 'react';
import { Html, Button, Heading, Section, Text, Head } from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <title>Verification Code</title>
      </Head>
      <Heading className="text-center"> Hey! {username}</Heading>
      <Section>
        <Text>Here is your otp :{otp}</Text>
      </Section>
    </Html>
  )
}
