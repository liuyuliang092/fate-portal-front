<!-- <template>
  <div>
    <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" placeholder="Search" />
    <div @mousedown="DragStencil(item, $event)">
      <a-tree :expandedKeys="expandedKeys" :auto-expand-parent="autoExpandParent" :tree-data="gData" @expand="onExpand">
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
import { defineComponent, ref, watch } from "vue";
import DagGraph from "./graph/index";
import { cloneDeep } from "lodash";
import { initformData, stencilList } from "./const/config";
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

const dataList = [];

const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({
      key,
      title: key,
    });

    if (node.children) {
      generateList(node.children);
    }
  }
};

generateList(genData);

const getParentKey = (key, tree) => {
  let parentKey;

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }

  return parentKey;
};

export default defineComponent({
  setup() {
    const expandedKeys = ref([]);
    const searchValue = ref("");
    const autoExpandParent = ref(true);
    const gData = ref(genData);

    const onExpand = (keys) => {
      expandedKeys.value = keys;
      autoExpandParent.value = false;
    };

    watch(searchValue, (value) => {
      const expanded = dataList
        .map((item) => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, gData.value);
          }

          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      expandedKeys.value = expanded;
      searchValue.value = value;
      autoExpandParent.value = true;
    });
    return {
      expandedKeys,
      searchValue,
      autoExpandParent,
      gData,
      onExpand,
    };
  },
});
  </script> -->