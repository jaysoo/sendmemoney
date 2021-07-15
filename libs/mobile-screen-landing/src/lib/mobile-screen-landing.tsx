import * as React from 'react';
import { Card, Paragraph, useTheme } from 'react-native-paper';
import { useListFundraisers } from '@sendmemoney/data-access-api';
import { useApiHostUrl } from '@sendmemoney/shared-contexts/api-context';
import { useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

const style = StyleSheet.create({
  card: {
    margin: 10,
  },
});

export function MobileScreenLanding({ navigation }: StackScreenProps<any>) {
  const theme = useTheme();
  const fundraisers = useListFundraisers();
  const hostUrl = useApiHostUrl();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fundraisers.refetch();
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          backgroundColor: theme.colors.background,
          height: '100%',
        }}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        {fundraisers.isLoading
          ? null
          : fundraisers?.data?.map((fundraiser) => (
              <Card
                key={fundraiser._id}
                style={style.card}
                elevation={5}
                onPress={() =>
                  navigation.navigate('Details', {
                    id: fundraiser._id,
                  })
                }
              >
                <Card.Cover
                  source={{ uri: `${hostUrl}${fundraiser.coverUrl}` }}
                />
                <Card.Title
                  title={fundraiser.title}
                  subtitle={`Details by ${fundraiser.name}`}
                />
                <Card.Content>
                  <Paragraph>
                    {fundraiser.description.length > 200
                      ? `${fundraiser.description.substr(0, 200)}...`
                      : fundraiser.description}
                  </Paragraph>
                </Card.Content>
              </Card>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
}
