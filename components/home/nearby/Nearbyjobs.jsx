import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import styles from "./nearbyjobs.style";

const Nearbyjobs = () => {
  const router = useRouter();
  // const isLoading = false
  // const error = false

  const { data, isLoading, error } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
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
