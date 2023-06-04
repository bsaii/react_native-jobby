import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './nearbyjobs.style';
import { useFetchJobs } from '../../../hooks/useFetchJobs';
import { COLORS } from '../../../constants/index';
import { Job } from '../../../types';
import { useRouter } from 'expo-router';
import { NearbyJobCard } from '../../../components/index';

const Nearbyjobs = () => {
  const { data, error } = useFetchJobs<Array<Job>>('search', {
    query: 'React Native developer',
    num_pages: '1',
  });
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {!data ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
