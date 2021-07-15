import {
  Button,
  Paragraph,
  Subheading,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import * as React from 'react';
import { useMemo, useState } from 'react';
import { useDonate, useGetFundraiser } from '@sendmemoney/data-access-api';
import { StackScreenProps } from '@react-navigation/stack';

const style = StyleSheet.create({
  details: {
    padding: 10,
  },
});

export function MobileScreenDonate({
  navigation,
  route,
}: StackScreenProps<any>) {
  const theme = useTheme();
  const fundraiser = useGetFundraiser(route.params?.id);
  const donate = useDonate(route.params?.id);
  const [amount, setAmount] = useState(0);
  const [tip, setTip] = useState(0);
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const tipAmount = useMemo(() => (amount * tip) / 100, [amount, tip]);
  const total = useMemo(() => amount + tipAmount, [amount, tipAmount]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    donate.mutate(
      {
        name,
        amount: total,
        fundraiser: route.params?.id,
      },
      {
        onSettled: () => setIsSubmitting(false),
        onSuccess: () => navigation.goBack(),
      }
    );
  };

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      <View style={style.details}>
        <Title>Donate to {fundraiser.data?.title}</Title>
        <Subheading style={{ marginBottom: 20 }}>
          You are supporting {fundraiser.data?.name}
        </Subheading>
        <TextInput
          label="Enter your donation"
          mode="outlined"
          left={<TextInput.Affix text="$" />}
          keyboardType="numeric"
          value={String(amount)}
          onChangeText={(value) => setAmount(Number(value))}
        />
        <TextInput
          label="Tip GiveMeMoney services"
          right={<TextInput.Affix text="%" />}
          mode="outlined"
          keyboardType="numeric"
          value={String(tip)}
          onChangeText={(value) => setTip(Number(value))}
        />
        <TextInput
          mode="outlined"
          label="What is your name? (Optional)"
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <Paragraph>Your donation ${amount}</Paragraph>
        <Paragraph>GiveMeMoney tip ${tipAmount}</Paragraph>
        <Paragraph>Total due today ${total}</Paragraph>
        <Button
          style={{ marginTop: 20 }}
          mode="contained"
          disabled={isSubmitting}
          onPress={handleSubmit}
        >
          Submit
        </Button>
      </View>
    </ScrollView>
  );
}
