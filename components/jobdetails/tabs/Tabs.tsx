import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { btnTextStyle, btnViewStyle, styles } from './tabs.style';
import { SIZES } from '../../../constants';

type TabsProps = {
  tabs: Array<string>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const Tabs = ({ activeTab, setActiveTab, tabs }: TabsProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

type TabButtonProps = {
  name: string;
  activeTab: string;
  onHandleSearchType: () => void;
};

function TabButton({ name, activeTab, onHandleSearchType }: TabButtonProps) {
  return (
    <TouchableOpacity
      style={btnViewStyle(name, activeTab)}
      onPress={onHandleSearchType}
    >
      <Text style={btnTextStyle(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  );
}

export default Tabs;
