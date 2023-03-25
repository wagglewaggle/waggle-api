import { PlaceEntity } from '../../place/entity/place.entity';

export const reviewPostReportForm = (nickname: string, reviewPostIdx: number, place: PlaceEntity) => {
  return {
    attachments: [
      {
        color: 'warning',
        pretext: `🚨 게시글 신고`,
        fields: [
          {
            title: '유저 닉네임',
            value: nickname,
            short: true,
          },
          {
            title: '장소 이름 & 종류',
            value: `${place.name} (${place.type})`,
            short: true,
          },
          {
            title: '게시글 번호',
            value: reviewPostIdx,
            short: true,
          },
        ],
        ts: Math.floor(new Date().getTime() / 1000).toString(),
      },
    ],
  };
};

export const replyReportForm = (nickname: string, reviewPostIdx: number, replyIdx: number, content: string, place: PlaceEntity) => {
  return {
    attachments: [
      {
        color: 'warning',
        pretext: `🚨 댓글 신고`,
        fields: [
          {
            title: '유저 닉네임',
            value: nickname,
            short: true,
          },
          {
            title: '장소 이름 & 종류',
            value: `${place.name} (${place.type})`,
            short: true,
          },
          {
            title: '게시글 번호',
            value: reviewPostIdx,
            short: true,
          },
          {
            title: '댓글 번호',
            value: replyIdx,
            short: true,
          },
          {
            title: '댓글 내용',
            value: content,
            short: true,
          },
        ],
        ts: Math.floor(new Date().getTime() / 1000).toString(),
      },
    ],
  };
};
