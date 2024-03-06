import type { App } from 'vue';

import AccordionInstall, { Accordion } from './accordion';
import AlertInstall, { Alert } from './alert';
import AnchorInstall, { Anchor } from './anchor';
import AutoCompleteInstall, { AutoComplete } from './auto-complete';
import AvatarInstall, { Avatar } from './avatar';
import BackTopInstall, { BackTop } from './back-top';
import BadgeInstall, { Badge } from './badge';
import BreadcrumbInstall, { Breadcrumb } from './breadcrumb';
import ButtonInstall, { Button, ButtonGroup } from './button';
import CalendarInstall, { Calendar } from './calendar';
import CardInstall, { Card } from './card';
import CardListInstall, { CardList } from './card-list';
import CarouselInstall, { Carousel, CarouselItem } from './carousel';
import CascaderInstall, { Cascader } from './cascader';
import CheckboxInstall, { Checkbox, CheckboxGroup, CheckboxButton } from './checkbox';
import CollapseInstall, { Collapse, CollapseItem } from './collapse';
import ColorPickerInstall, { ColorPicker } from './color-picker';
import CommentInstall, { Comment } from './comment';
import CountdownInstall, { Countdown } from './countdown';
import CustomizeStepsInstall, { CustomizeSteps } from './customize-steps';
import DatePickerInstall, { DatePicker, StickSlider } from './date-picker';
import DatePickerProInstall, { DatePickerPro, NRangeDatePickerPro } from './date-picker-pro';
import DescriptionsInstall, { Descriptions } from './descriptions';
import DividerInstall, { Divider } from './divider';
import DragdropInstall, { DraggableDirective, DroppableDirective, SortableDirective } from './dragdrop';
import DrawerInstall, { Drawer, DrawerService } from './drawer';
import DropdownInstall, { Dropdown, DropdownMenu } from './dropdown';
import DynamicWidenInstall, { DynamicWiden } from './dynamic-widen';
import EditableSelectInstall, { EditableSelect } from './editable-select';
import EmptyInstall, { Empty } from './empty';
import FormInstall, { Form, FormItem, FormOperation } from './form';
import FullscreenInstall, { Fullscreen } from './fullscreen';
import GanttInstall, { Gantt } from './gantt';
import GridInstall, { Row, Col } from './grid';
import HandleWidthInstall, { HandleWidth } from './handle-width';
import IconInstall, { Icon, IconGroup } from './icon';
import ImagePreviewInstall, { ImagePreviewDirective, ImagePreviewService } from './image-preview';
import ImportErrModalInstall, { ImportErrModal } from './import-err-modal';
import InputInstall, { Input } from './input';
import InputIconInstall, { InputIcon } from './input-icon';
import InputNumberInstall, { InputNumber } from './input-number';
import LayoutInstall, { Layout, Content, Header, Footer, Aside } from './layout';
import LeftTreeInstall, { LeftTree } from './left-tree';
import ListInstall, { List, ListItem } from './list';
import LoadingInstall, { LoadingService, LoadingDirective } from './loading';
import MentionInstall, { Mention } from './mention';
import MenuInstall, { Menu, SubMenu, MenuItem } from './menu';
import MessageInstall, { Message } from './message';
import MessageBoxInstall, { MessageBox, MessageBoxService } from './message-box';
import ModalInstall, { Modal } from './modal';
import ModuleNameInstall, { ModuleName } from './module-name';
import MultiAutoCompleteInstall, { MultiAutoComplete } from './multi-auto-complete';
import MyTableInstall, { MyTable } from './my-table';
import NavSpriteInstall, { NavSprite } from './nav-sprite';
import NotificationInstall, { Notification, NotificationService } from './notification';
import OverlayInstall, { FlexibleOverlay, FixedOverlay } from './overlay';
import PaginationInstall, { Pagination, ClickoutsideDirective } from './pagination';
import PanelInstall, { Panel, PanelHeader, PanelBody, PanelFooter } from './panel';
import PermissionButtonInstall, { PermissionButton } from './permission-button';
import PopoverInstall, { Popover } from './popover';
import ProgressInstall, { Progress } from './progress';
import PublicTableInstall, { PublicTable } from './public-table';
import QuadrantDiagramInstall, { QuadrantDiagram } from './quadrant-diagram';
import RadioInstall, { Radio, RadioGroup, RadioButton } from './radio';
import RateInstall, { Rate } from './rate';
import ReadTipInstall, { ReadTip } from './read-tip';
import ResultInstall, { Result } from './result';
import RippleInstall, { RippleDirective } from './ripple';
import ScrollbarInstall, { NScrollbar } from './scrollbar';
import SearchInstall, { Search } from './search';
import SelectInstall, { Select, Option, OptionGroup } from './select';
import SkeletonInstall, { Skeleton, SkeletonItem } from './skeleton';
import SliderInstall, { Slider } from './slider';
import SpaceInstall, { Space } from './space';
import SplitterInstall, { Splitter } from './splitter';
import StatisticInstall, { Statistic } from './statistic';
import StatusInstall, { Status } from './status';
import StepsInstall, { Steps, Step } from './steps';
import StepsGuideInstall, { StepsGuide, StepsGuideDirective } from './steps-guide';
import StickyInstall, { Sticky } from './sticky';
import SwitchInstall, { Switch } from './switch';
import TableInstall, { Table, Column } from './table';
import TableVInstall, { Alignment, FixedDir, SortOrder, placeholderSign } from './table-v';
import TabsInstall, { Tabs, Tab } from './tabs';
import TagInstall, { Tag } from './tag';
import TagInputInstall, { TagInput } from './tag-input';
import TextareaInstall, { Textarea } from './textarea';
import TimePickerInstall, { TimePicker } from './time-picker';
import TimeSelectInstall, { TimeSelect } from './time-select';
import TimelineInstall, { Timeline, TimelineItem } from './timeline';
import TooltipInstall, { Tooltip } from './tooltip';
import TransferInstall, { Transfer } from './transfer';
import TreeInstall, { Tree } from './tree';
import TreeSelectInstall, { TreeSelect } from './tree-select';
import UploadInstall, { Upload } from './upload';
import VirtualListInstall, { VirtualList } from './virtual-list';
import WatermarkInstall, { Watermark } from './watermark';
import './style/nancalui.scss';

const installs = [
  AccordionInstall,
  AlertInstall,
  AnchorInstall,
  AutoCompleteInstall,
  AvatarInstall,
  BackTopInstall,
  BadgeInstall,
  BreadcrumbInstall,
  ButtonInstall,
  CalendarInstall,
  CardInstall,
  CardListInstall,
  CarouselInstall,
  CascaderInstall,
  CheckboxInstall,
  CollapseInstall,
  ColorPickerInstall,
  CommentInstall,
  CountdownInstall,
  CustomizeStepsInstall,
  DatePickerInstall,
  DatePickerProInstall,
  DescriptionsInstall,
  DividerInstall,
  DragdropInstall,
  DrawerInstall,
  DropdownInstall,
  DynamicWidenInstall,
  EditableSelectInstall,
  EmptyInstall,
  FormInstall,
  FullscreenInstall,
  GanttInstall,
  GridInstall,
  HandleWidthInstall,
  IconInstall,
  ImagePreviewInstall,
  ImportErrModalInstall,
  InputInstall,
  InputIconInstall,
  InputNumberInstall,
  LayoutInstall,
  LeftTreeInstall,
  ListInstall,
  LoadingInstall,
  MentionInstall,
  MenuInstall,
  MessageInstall,
  MessageBoxInstall,
  ModalInstall,
  ModuleNameInstall,
  MultiAutoCompleteInstall,
  MyTableInstall,
  NavSpriteInstall,
  NotificationInstall,
  OverlayInstall,
  PaginationInstall,
  PanelInstall,
  PermissionButtonInstall,
  PopoverInstall,
  ProgressInstall,
  PublicTableInstall,
  QuadrantDiagramInstall,
  RadioInstall,
  RateInstall,
  ReadTipInstall,
  ResultInstall,
  RippleInstall,
  ScrollbarInstall,
  SearchInstall,
  SelectInstall,
  SkeletonInstall,
  SliderInstall,
  SpaceInstall,
  SplitterInstall,
  StatisticInstall,
  StatusInstall,
  StepsInstall,
  StepsGuideInstall,
  StickyInstall,
  SwitchInstall,
  TableInstall,
  TableVInstall,
  TabsInstall,
  TagInstall,
  TagInputInstall,
  TextareaInstall,
  TimePickerInstall,
  TimeSelectInstall,
  TimelineInstall,
  TooltipInstall,
  TransferInstall,
  TreeInstall,
  TreeSelectInstall,
  UploadInstall,
  VirtualListInstall,
  WatermarkInstall
];

export {
  Accordion,
  Alert,
  Anchor,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardList,
  Carousel,
  CarouselItem,
  Cascader,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  Collapse,
  CollapseItem,
  ColorPicker,
  Comment,
  Countdown,
  CustomizeSteps,
  DatePicker,
  StickSlider,
  DatePickerPro,
  NRangeDatePickerPro,
  Descriptions,
  Divider,
  DraggableDirective,
  DroppableDirective,
  SortableDirective,
  Drawer,
  DrawerService,
  Dropdown,
  DropdownMenu,
  DynamicWiden,
  EditableSelect,
  Empty,
  Form,
  FormItem,
  FormOperation,
  Fullscreen,
  Gantt,
  Row,
  Col,
  HandleWidth,
  Icon,
  IconGroup,
  ImagePreviewDirective,
  ImagePreviewService,
  ImportErrModal,
  Input,
  InputIcon,
  InputNumber,
  Layout,
  Content,
  Header,
  Footer,
  Aside,
  LeftTree,
  List,
  ListItem,
  LoadingService,
  LoadingDirective,
  Mention,
  Menu,
  SubMenu,
  MenuItem,
  Message,
  MessageBox,
  MessageBoxService,
  Modal,
  ModuleName,
  MultiAutoComplete,
  MyTable,
  NavSprite,
  Notification,
  NotificationService,
  FlexibleOverlay,
  FixedOverlay,
  Pagination,
  ClickoutsideDirective,
  Panel,
  PanelHeader,
  PanelBody,
  PanelFooter,
  PermissionButton,
  Popover,
  Progress,
  PublicTable,
  QuadrantDiagram,
  Radio,
  RadioGroup,
  RadioButton,
  Rate,
  ReadTip,
  Result,
  RippleDirective,
  NScrollbar,
  Search,
  Select,
  Option,
  OptionGroup,
  Skeleton,
  SkeletonItem,
  Slider,
  Space,
  Splitter,
  Statistic,
  Status,
  Steps,
  Step,
  StepsGuide,
  StepsGuideDirective,
  Sticky,
  Switch,
  Table,
  Column,
  Alignment,
  FixedDir,
  SortOrder,
  placeholderSign,
  Tabs,
  Tab,
  Tag,
  TagInput,
  Textarea,
  TimePicker,
  TimeSelect,
  Timeline,
  TimelineItem,
  Tooltip,
  Transfer,
  Tree,
  TreeSelect,
  Upload,
  VirtualList,
  Watermark
};

export default {
  version: '1.0.0',
  install(app: App): void {
    installs.forEach((p) => app.use(p));
  }
};
