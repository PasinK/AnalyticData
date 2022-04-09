import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, { useEffect } from "react";
import { NativeBaseProvider, Box, Select, CheckIcon, Center, HStack, VStack, Divider, View, Text } from "native-base";
import { Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import { client } from './AxiosTest';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { Dataset } from 'react-native-chart-kit/dist/HelperTypes';



export default function App() {
  let [service, setService] = React.useState("");
  const [fetchedData, setFetchedData] = React.useState();
  const baseUrl = 'https://reqres.in';
  interface HealthRecordData {
    dateTime: string,
    value: number
  }
  interface HealthRecordAnalytic {
    tableName: string,
    columnName: string,
    unit: string,
    analyticData: {
      mean: number,
      max: number,
      min: number
    },
    data: HealthRecordData[]
  }
  interface Show {
    labels: string[],
    datasets: {
      data: number[]
    }
  }

  const [labels, setLabels] = React.useState<string[]>([]);
  const [datasets, setDatasets] = React.useState<Dataset[]>();
  const [data, setData] = React.useState<HealthRecordAnalytic>();
  const [display, setDisplay] = React.useState<LineChartData>();

  const getData = async () => {
    try {
      const result = await client.get(
        `healthRecord/analytics/ความดัน/Lower/3months`
      );
      const data = result.data as HealthRecordAnalytic
      setData(data)
      setLabels(data.data.map((label, index) => { return label.dateTime }))
      setDatasets(data.data.map((count, index) => { return count.value }))
      interface Show {
        labels: string[],
        datasets: {
          data: number[]
        }
      }
      // if (datasets) {
      //   const display: LineChartData = {
      //   labels: labels,
      //   datasets: {
      //     data: datasets
      //   }
      // }}
      
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const getElderlyData = async () => {
  //   await client.get(
  //     `/healthRecord/analytics/${elderlyId}/${healthRecordName}/${columnName}/${timespan}`
  //   );
  // };

  useEffect(() => {
    getData();
  }, [])

  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <VStack space={2} pt={4} px={4} alignItems='center' flex='1' marginTop='8'>
          <Text bold fontSize="xl"> Value </Text>
          <View flexDirection='row' justifyContent='space-between'>
            <View alignItems='center' justifyContent='space-between' width='full' flexDirection='row'>
              <Text fontSize="lg">Filler</Text>
              {/* <Box w='1/2'> */}
              <View width='1/4'>
                <Select selectedValue={service} accessibilityLabel="Choose Service" placeholder="Year" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                  {timeFrameOption.map((option, index) => {
                    return (
                      <Select.Item key={index} label={option.label} value={option.value} />
                    )
                  })}
                </Select>
              </View>
              {/* </Box> */}
            </View>
          </View>
          <LineChart
            data={{labels: labels, datasets:datasets as}}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
          />

          <VStack w='full' space={1}>
            <View style={styles.wrapper}>
              <HStack justifyContent='space-evenly'>
                <Text>Value</Text>
                <Text>Max</Text>
                <Text>Min</Text>
                <Text>Mean</Text>
              </HStack>
            </View>
            {/* <Divider my={0} bgColor='#000' /> */}
            <HStack justifyContent='space-evenly'>
              <Text>{data?.columnName}</Text>
              <Text>{data?.analyticData?.max}</Text>
              <Text>{data?.analyticData?.mean}</Text>
              <Text>{data?.analyticData?.min}</Text>
            </HStack>
          </VStack>
        </VStack>
        <View>
          <Text>
            {/* {JSON.stringify(fetchedData)} */}
          </Text>
        </View>



      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    borderBottomColor: 'black',
    borderBottomWidth: 2
  }
});


const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(29, 132, 223, ${opacity})`,
  strokeWidth: 2.5, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const timeFrameOption = [{
  label: 'Week',
  value: "WEEK"
}, {
  label: '2 Weeks',
  value: "2 WEEKS"
}, {
  label: '1 Month',
  value: "1 MONTHS"
}, {
  label: '3 Months',
  value: "3 MONTHS"
}, {
  label: 'Year',
  value: "YEAR"
}, {
  label: 'All Time',
  value: "ALL TIME"
}]

