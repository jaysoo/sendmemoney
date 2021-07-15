import {
  Button,
  Colors,
  Divider,
  Paragraph,
  ProgressBar,
  Subheading,
  Title,
  useTheme,
} from 'react-native-paper';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import * as React from 'react';
import {
  useGetDonationTotal,
  useGetFundraiser,
} from '@sendmemoney/data-access-api';
import { useApiHostUrl } from '@sendmemoney/shared-contexts/api-context';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

const style = StyleSheet.create({
  details: {
    padding: 10,
  },
});

export function MobileScreenDetails({
  navigation,
  route,
}: StackScreenProps<any>) {
  const isFocused = useIsFocused();
  const theme = useTheme();
  const hostUrl = useApiHostUrl();
  const fundraiser = useGetFundraiser(route.params?.id);
  const screenWidth = Dimensions.get('window').width;
  const donationTotal = useGetDonationTotal(route.params?.id);

  React.useEffect(() => {
    fundraiser.refetch();
  }, [isFocused, fundraiser]);

  const progress =
    donationTotal.data && fundraiser.data
      ? Math.min(1, donationTotal.data.total / fundraiser.data.goal)
      : 0;

  navigation.setOptions({ title: fundraiser.data?.title });

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      <Image
        resizeMode="cover"
        style={{ width: screenWidth, height: 200 }}
        source={{ uri: `${hostUrl}${fundraiser.data?.coverUrl}` }}
      />
      <View style={style.details}>
        <Subheading>Fundraiser by {fundraiser.data?.name}</Subheading>
        <Title>
          ${donationTotal.data?.total} raised of ${fundraiser.data?.goal} goal
        </Title>
        <ProgressBar progress={progress} color={Colors.red800} />
        <Divider />
        <Paragraph style={{ paddingVertical: 10 }}>
          {fundraiser.data?.description}
        </Paragraph>
        <Button
          onPress={() =>
            navigation.navigate('Donate', { id: route.params?.id })
          }
          mode="contained"
        >
          Donate now
        </Button>
      </View>
    </ScrollView>
  );
}
