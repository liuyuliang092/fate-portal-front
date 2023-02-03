<template>
  <div>
    <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" placeholder="Search" />
    <div>
      <a-tree :tree-data="gData" @mousedown.native="DragStencil(a,$event)">
        <template #title="{ title }">
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span style="color: #f50">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }}</span>
        </template>
      </a-tree>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import DagGraph from "./graph/index";
import { initformData, stencilList } from "./const/config";
import { defineComponent, ref, watch } from 'vue';

const genData = [
  {
    title: "样本集组件",
    key: "样本集组件",
    children: [
      {
        title: "样本集加载器v1.0",
        key: "样本集加载器v1.0",

      },
      {
        title: "样本集加载器v2.0",
        key: "样本集加载器v2.0",

      },
    ],
  },
  {
    title: "机器学习",
    key: "机器学习",
    children: [
      {
        title: "纵向逻辑回归",
        key: "纵向逻辑回归",
      },
      {
        title: "MPC_NPZ",
        key: "MPC_NPZ",

      },
      {
        title: "评分卡",
        key: "评分卡",

      },
    ],
  },
];

// const dataList = [];

// const generateList = (data) => {
//   for (let i = 0; i < data.length; i++) {
//     const node = data[i];
//     const key = node.key;
//     dataList.push({
//       key,
//       title: key,
//     });

//     if (node.children) {
//       generateList(node.children);
//     }
//   }
// };

// generateList(genData);

// const getParentKey = (key, tree) => {
//   let parentKey;

//   for (let i = 0; i < tree.length; i++) {
//     const node = tree[i];

//     if (node.children) {
//       if (node.children.some((item) => item.key === key)) {
//         parentKey = node.key;
//       } else if (getParentKey(key, node.children)) {
//         parentKey = getParentKey(key, node.children);
//       }
//     }
//   }

//   return parentKey;
// };

export default {
  name: "AlgoNodeTree",
  data() {
    return {
      gData: [],
      expandedKeys: ref([]),
      searchValue: ref(""),
      autoExpandParent: ref(true)
    };
  },
  computed: {
    dataList() {
      let list = cloneDeep(stencilList);
      let value = this.searchValue;
      return list.filter((item) => item.label.includes(value));
    }
  },
  mounted() {
    this.gData = ref(genData);
    DagGraph.initStencilTree("stencil-container");
  },
  methods: {
    // 拖拽事件
    DragStencil(shape, event) {
      debugger;
      const { dnd, graph } = DagGraph;
      let node = graph.createNode({
        // shape: shape,
        // data: cloneDeep(genData[shape])
        width: 100,
        height: 40,
        attrs: {
          label: {
            text: "Rect",
            fill: "#6a6c8a"
          },
          body: {
            stroke: "#31d0c6",
            strokeWidth: 2
          }
        }
      });
      dnd.start(node, event);
    },
    // 搜索模型
    // searchStencil(searchValue) {
    //   const expanded = dataList
    //     .map((item) => {
    //       if (item.title.indexOf(searchValue) > -1) {
    //         return getParentKey(item.key, this.gData.value);
    //       }
    //       return null;
    //     })
    //     .filter((item, i, self) => item && self.indexOf(item) === i);
    //   this.expandedKeys = expanded;
    //   this.searchValue = searchValue;
    //   this.autoExpandParent = true;
    // },

    onSelect(selectedKeys, { node }) {
      node.onExpand()
    },

    onExpand(data) {
      debugger
    }

  },

}
</script>
<style  lang='less' scoped>
</style>