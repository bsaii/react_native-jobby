import { StyleSheet, ViewStyle } from 'react-native';

import { COLORS, FONT, SHADOWS, SIZES } from '../../../../constants/index';
import { Job } from 'types';

export const styles = StyleSheet.create({
  logoImage: {
    width: '70%',
    height: '70%',
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: '#B3AEC6',
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  infoWrapper: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: '#B3AEC6',
  },
});

export const containerViewStyle = (
  selectedJob: string,
  job_id: Job['job_id']
): ViewStyle => ({
  width: 250,
  padding: SIZES.xLarge,
  backgroundColor: selectedJob === job_id ? COLORS.primary : '#FFF',
  borderRadius: SIZES.medium,
  justifyContent: 'space-between',
  ...SHADOWS.medium,
  shadowColor: COLORS.white,
});

export const logoContainerViewStyle = (
  selectedJob: string,
  job_id: Job['job_id']
): ViewStyle => ({
  width: 50,
  height: 50,
  backgroundColor: selectedJob === job_id ? '#FFF' : COLORS.white,
  borderRadius: SIZES.medium,
  justifyContent: 'center',
  alignItems: 'center',
});

export const jobNameTextStyle = (
  selectedJob: string,
  job_id: Job['job_id']
) => ({
  fontSize: SIZES.large,
  fontFamily: FONT.medium,
  color: selectedJob === job_id ? COLORS.white : COLORS.primary,
});

export const publisherTextStyle = (
  selectedJob: string,
  job_id: Job['job_id']
) => ({
  fontSize: SIZES.medium - 2,
  fontFamily: FONT.bold,
  color: selectedJob === job_id ? COLORS.white : COLORS.primary,
});
