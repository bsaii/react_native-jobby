import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import {
  styles,
  containerViewStyle,
  jobNameTextStyle,
  logoContainerViewStyle,
  publisherTextStyle,
} from './popularjobcard.style';
import { Job } from '../../../../types';
import { checkImageURL } from '../../../../utils';

type PopularJobCardProps = {
  job: Job;
  selectedJob: string;
  handleCardPress: (job: Job) => void;
};

const PopularJobCard = ({
  handleCardPress,
  job,
  selectedJob,
}: PopularJobCardProps) => {
  return (
    <TouchableOpacity
      style={containerViewStyle(selectedJob, job.job_id)}
      onPress={() => handleCardPress(job)}
    >
      <TouchableOpacity style={logoContainerViewStyle(selectedJob, job.job_id)}>
        <Image
          source={{
            uri: checkImageURL(job?.employer_logo)
              ? job.employer_logo
              : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg',
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {job?.employer_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text
          style={jobNameTextStyle(selectedJob, job.job_id)}
          numberOfLines={1}
        >
          {job?.job_title}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={publisherTextStyle(selectedJob, job.job_id)}>
            {job?.job_publisher} -
          </Text>
          <Text style={styles.location}> {job?.job_country}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
