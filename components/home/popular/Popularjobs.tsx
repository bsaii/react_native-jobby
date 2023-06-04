import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants/index';
import PopularJobCard from '../../../components/common/cards/popular/PopularJobCard';
import { useFetchJobs } from '../../../hooks/useFetchJobs';
import { Job } from '../../../types';
import { useRouter } from 'expo-router';

const Popularjobs = () => {
  const [selectedJob, setSelectedJob] = useState('');
  const { data, error } = useFetchJobs<Array<Job>>('search', {
    query: 'React developer',
    num_pages: '1',
  });
  const router = useRouter();

  const handleCardPress = (job: Job) => {
    router.push(`/job-details/${job.job_id}`);
    setSelectedJob(job.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
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
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                job={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
