import { RelationType } from '@/types/relationreport';
import webview from './webview';

export const viewBridgeRelationshipMap = ({
  type,
  menuName,
  menuSeq,
}: {
  type?: RelationType;
  menuName?: string;
  menuSeq?: number;
}) => {
  webview.logEvent('view_bridge_relationship_map', {
    type,
    menu_name: menuName,
    menu_seq: String(menuSeq),
  });
};

export const createdRelationNew = ({
  menuSeq,
  menuName,
}: {
  menuSeq?: number;
  menuName?: string;
}) => {
  webview.logEvent('created_relation_new', {
    menu_seq: String(menuSeq),
    menu_name: menuName,
  });
};

export const viewRelationCreateNew = ({
  menuSeq,
  menuName,
}: {
  menuSeq?: number;
  menuName?: string;
}) => {
  webview.logEvent('view_relation_create_new', {
    menu_seq: String(menuSeq),
    menu_name: menuName,
  });
};

export const viewListAddMemberPopup = () => {
  webview.logEvent('view_list_add_member_popup');
};

export const touchRelationLinkCopy = () => {
  webview.logEvent('touch_relation_link_copy');
};

export const touchRelationKakaoShare = () => {
  webview.logEvent('touch_relation_kakao_share');
};

export const touchRelationAdd = () => {
  webview.logEvent('touch_relation_add');
};

export const touchRelationCreateNew = ({
  menuSeq,
  menuName,
}: {
  menuSeq?: number;
  menuName?: string;
}) => {
  webview.logEvent('touch_relation_create_new', {
    menu_seq: String(menuSeq),
    menu_name: menuName,
  });
};

export const touchRelationShare = ({
  screenName,
}: {
  screenName?: 'relationship_map' | 'bridge_relationship_map';
}) => {
  webview.logEvent('touch_relation_share', { screen_name: screenName });
};

export const viewRelationshipMap = ({
  relationshipMapName,
  isJoinedRelationshipMap,
  relationshipMapMemberCount,
  menuName,
  menuSeq,
}: {
  relationshipMapName?: string;
  isJoinedRelationshipMap: boolean;
  relationshipMapMemberCount?: number;
  menuName?: string;
  menuSeq?: number;
}) => {
  webview.logEvent('view_relationship_map', {
    relationship_map_name: relationshipMapName,
    is_joined_relationship_map: isJoinedRelationshipMap,
    relationship_map_member_count: relationshipMapMemberCount ?? 0,
    menu_name: menuName,
    menu_seq: String(menuSeq),
  });
};

export const viewListRelationStartingMember = () => {
  webview.logEvent('view_list_relation_starting_member');
};

export const touchRelationAddNewResultButton = ({
  menuSeq,
  menuName,
}: {
  menuSeq?: number;
  menuName?: string;
}) => {
  webview.logEvent('touch_relation_add_new_result_button', {
    menu_seq: String(menuSeq),
    menu_name: menuName,
  });
};
