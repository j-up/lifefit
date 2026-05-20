export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
}

export const postsPart1: Post[] = [
  {
    id: "1",
    title: "2026년 육아기 근로시간 단축 제도 총정리",
    slug: "parenting-work-reduction-2026",
    date: "2026-05-10",
    summary: "2026년 변경된 육아기 근로시간 단축 제도의 조건과 혜택, 신청 방법을 알아봅니다.",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    category: "육아·복지",
    readTime: "8분",
    content: `<h2>육아기 근로시간 단축 제도란 무엇인가요?</h2>
<p>육아기 근로시간 단축 제도는 아이를 키우는 부모가 정상적인 근무 시간을 줄이고, 그 줄어든 시간만큼 <strong>고용보험에서 급여를 지원</strong>해 주는 정책입니다. 쉽게 말해, "회사에서 일하는 시간을 줄이되, 줄어든 돈의 일부를 국가가 채워준다"는 제도라고 생각하시면 됩니다.</p>
<p>이 제도는 <strong>출산 후 부모의 경제적 부담을 덜어주고</strong>, 아이와 볼 시간을 늘려주기 위해 마련되었습니다. 예를 들어, 기존에 주 40시간 일하시던 분이 주 20시간으로 줄이면, 나머지 20시간 분의 임금을 고용보험이 <strong>일정 비율(최대 80%)</strong> 보전해 드립니다.</p>

<img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80" alt="부모와 아이가 함께 시간을 볂는 모습" class="w-full rounded-xl my-6 object-cover h-64">

<h2>2026년 달라진 점: 2년 연장과 급여 지원 확대</h2>
<p>2026년부터 이 제도에 중요한 변화가 생겼습니다. 기존에는 아이가 만 8세(초등학교 2학년) 이하이거나, 초등학교 3~4학년(만 9~10세)인 경우에만 신청할 수 있었는데요, <strong>2026년부터는 지원 대상 자녀 연령이 2년 연장</strong>되어 초등학교 6학년(만 12세) 이하까지 확대되었습니다.</p>
<p>또한, 기존에는 소득 상한선(월 350만 원)이 있어서 월급이 많으신 분들은 지원을 받지 못했는데, 2026년부터는 <strong>소득 기준 완화</strong>로 더 많은 부모님들이 혜택을 받을 수 있게 되었습니다. 단축 근무 기간 중 받을 수 있는 총 급여 상한액도 인상되어, 실질적인 도움이 커졌습니다.</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
  <p>💡 <strong>꿀팁:</strong> 2026년 변경 사항은 소급 적용되지 않으므로, 자녀가 현재 초등학교 5~6학년이라면 올해 안에 신청하세요! 남은 학기 동안이라도 혜택을 받을 수 있습니다.</p>
</div>

<h2>누가 신청할 수 있나요? 자격 조건 완벽 정리</h2>
<p>이 제도를 이용하려면 몇 가지 조건을 충족해야 합니다. 하나씩 천천히 살펴 보겠습니다.</p>

<h3>1. 자녀 연령 조건</h3>
<p>자녀가 <strong>만 12세 이하(초등학교 6학년 이하)</strong>이거나, <strong>장애 아동인 경우 만 18세 이하</strong>여야 합니다. 입양한 경우에는 입양일부터 적용됩니다. 쌍둥이나 둘 이상의 자녀가 있는 경우, <strong>막내 기준</strong>으로 판단합니다.</p>

<h3>2. 고용보험 가입 기간</h3>
<p>신청 시점 기준으로 <strong>고용보험에 180일 이상 가입</strong>되어 있어야 합니다. 이 180일은 당연히 다니던 회사뿐만 아니라, 이전 직장에서 납부한 기간도 합산(연속은 아니어도 됨)됩니다.</p>

<h3>3. 근로시간 단축 범위</h3>
<p>주 40시간 기준, <strong>최소 15시간에서 최대 35시간까지</strong> 단축할 수 있습니다. 즉, 주 5시간(하루 1시간)만 줄여도 신청 가능하고, 주 35시간(하루 7시간)까지 단축필 수 있습니다. 단축 후 남은 근무 시간은 주 5시간 이상이어야 합니다.</p>

<table class="w-full text-sm my-6 border-collapse">
  <thead class="bg-gray-100">
    <tr>
      <th class="p-3 text-left border">단축 시간</th>
      <th class="p-3 text-left border">하루 기준</th>
      <th class="p-3 text-left border">월 급여 감소율</th>
      <th class="p-3 text-left border">고용보험 지원율</th>
      <th class="p-3 text-left border">적합한 분</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border">주 15시간</td>
      <td class="p-3 border">하루 3시간</td>
      <td class="p-3 border">약 37.5%</td>
      <td class="p-3 border">감소분의 80%</td>
      <td class="p-3 border">아이 등하원 돌봄이 필요한 분</td>
    </tr>
    <tr>
      <td class="p-3 border">주 20시간</td>
      <td class="p-3 border">하루 4시간</td>
      <td class="p-3 border">약 50%</td>
      <td class="p-3 border">감소분의 80%</td>
      <td class="p-3 border">반일 근무를 원하는 분</td>
    </tr>
    <tr>
      <td class="p-3 border">주 25시간</td>
      <td class="p-3 border">하루 5시간</td>
      <td class="p-3 border">약 62.5%</td>
      <td class="p-3 border">감소분의 80%</td>
      <td class="p-3 border">오후 반나절 근무 희망자</td>
    </tr>
    <tr>
      <td class="p-3 border">주 30시간</td>
      <td class="p-3 border">하루 6시간</td>
      <td class="p-3 border">약 75%</td>
      <td class="p-3 border">감소분의 80%</td>
      <td class="p-3 border">오전 중심 근무, 저녁 가족 시간 필요</td>
    </tr>
    <tr>
      <td class="p-3 border">주 35시간</td>
      <td class="p-3 border">하루 7시간</td>
      <td class="p-3 border">약 87.5%</td>
      <td class="p-3 border">감소분의 80%</td>
      <td class="p-3 border">조금이라도 일하면서 가계 보충</td>
    </tr>
  </tbody>
</table>

<h2>신청 방법: 단계별 완벽 가이드</h2>
<p>신청은 생각보다 복잡하지 않습니다. 순서대로 따라해 보세요.</p>

<ul class="list-disc pl-5 space-y-2 my-4">
  <li><strong>1단계:</strong> 먼저 회사 인사팀이나 상사와 상담하여 근로시간 단축이 가능한지 확인합니다.</li>
  <li><strong>2단계:</strong> 근로자와 사용자(회사)가 서면 합의합니다. 구두 약속은 인정되지 않으니 꼭 <strong>서면으로 작성</strong>하세요.</li>
  <li><strong>3단계:</strong> 고용보험 홈페이지(work.go.kr)나 고용센터에 방문하여 신청서를 제출합니다. 회사 대표도 함께 신청해야 합니다.</li>
  <li><strong>4단계:</strong> 소득 및 자녀 관련 서류(가족관계증명서, 건강보험 자격득실확인서 등)를 제출합니다.</li>
  <li><strong>5단계:</strong> 심사 후 승인되면 단축 근무를 시작하고, 매달 고용보험 급여가 통장으로 입금됩니다.</li>
</ul>

<h2>급여 계산법: 내가 실제로 받게 되는 돈</h2>
<p>급여는 두 갈래로 들어옵니다. <strong>회사가 줄어든 시간만큼 비례해서 급여를 지급</strong>하고, <strong>고용보험이 감소분의 80%를 보전</strong>해 줍니다. 다만 고용보험 지원금은 상한액이 있어서 무한정 받을 수는 없습니다.</p>

<h3>월급 300만 원 기준, 주 20시간 단축 시</h3>
<p>기존 월급 300만 원에서 주 20시간(50%) 단축하면 회사는 150만 원을 지급합니다. 감소분 150만 원의 80%인 <strong>120만 원을 고용보험에서 지원</strong>합니다. 단, 2026년 기준 월 상한액은 약 177만 원이므로 120만 원은 상한 내에서 전액 지급됩니다.</p>
<p>따라서 총 수령액은 <strong>150만 원(회사) + 120만 원(고용보험) = 270만 원</strong>이 됩니다. 원래 월급의 90%를 유지하게 되는 셈입니다.</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
  <p>⚠️ <strong>주의:</strong> 고용보험 지원금은 소득세와 지방소득세(약 6.6%)가 원천징수됩니다. 실제로 통장에 들어오는 금액은 계산한 금액보다 조금 적을 수 있으니 참고하세요.</p>
</div>

<h2>실제 사례로 보는 육아기 단축근무</h2>
<p>김민수 씨(35세)는 IT 회사에 다니며 월급 400만 원을 받고 있었습니다. 아들이 초등학교 1학년에 진학하면서 등하교 시간을 맞추기 어려워 주 20시간 단축근무를 신청했습니다.</p>
<p>회사에서는 200만 원을 지급했고, 고용보험에서는 감소분 200만 원의 80%인 160만 원을 지원받았습니다. 다만 상한액을 초과하지 않아 전액 수령했고, <strong>월 총 360만 원</strong>을 받게 되었습니다. 세금 공제 후 약 335만 원이 통장에 입금되었습니다.</p>
<p>민수 씨는 "처음에는 월급이 줄어서 걱정했는데, 생각보다 차이가 나지 않아서 다행이에요. 아들이랑 저녁 시간도 보내고 학교 행사도 빠짐없이 참석할 수 있어서 후회 없어요"라고 말했습니다.</p>

<h2>자주 묻는 질문 (FAQ)</h2>

<h3>부모 둘 다 신청할 수 있나요?</h3>
<p>네, 가능합니다. 단, <strong>동일한 자녀에 대해서는 한 명만 단축근무 급여를 받을 수 있습니다.</strong> 예를 들어 엄마가 먼저 1년간 이용하고, 그다음 아빠가 1년간 이용하는 식으로 순차적으로 활용할 수 있습니다. 각각 최대 3년까지 가능합니다.</p>

<h3>육아휴직과 함께 쓸 수 있나요?</h3>
<p>네, 순차적으로 이용할 수 있습니다. 예를 들어 출산 후 먼저 <strong>육아휴직 1년 → 육아기 단축근무 3년</strong> 이렇게 총 4년간 아이와 함께하실 수 있습니다. 단, 동시에 두 제도를 병행하는 것은 불가능합니다.</p>

<h3>회사에서 거절하면 어떡하나요?</h3>
<p>규모에 따라 다릅니다. <strong>300인 이상 기업</strong>은 정당한 사유 없이 거절할 수 없습니다. 300인 미만 기업은 업무 대체 인력 채용이 어려운 경우 거절할 수 있지만, 이 경우 거절 사유서를 교부해야 합니다. 무리하게 거절당했다면 관할 고용노동관서에 상담하세요.</p>`
  },
  {
    id: "2",
    title: "청년월세 특별지원 조건 및 신청 방법 안내",
    slug: "youth-rent-support-guide",
    date: "2026-05-12",
    summary: "청년들의 주거비 부담을 줄여주는 청년월세 특별지원의 조건과 소득 기준을 정리했습니다.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    category: "주거·청년",
    readTime: "7분",
    content: `<h2>청년월세 특별지원이란?</h2>
<p>청년월세 특별지원은 주거비 부담으로 고통받는 <strong>만 19세~34세 청년</strong>에게 매달 <strong>최대 20만 원씩, 최대 12개월간</strong> 월세를 지원해 주는 정책입니다. 총 <strong>최대 240만 원</strong>을 지원받을 수 있는 제도로, 2026년 기준 소득 기준이 완화되어 더 많은 청년이 혜택을 받을 수 있게 되었습니다.</p>
<p>이 제도는 한국토지주택공사(LH)와 주택도시기금을 통해 운영되며, <strong>무이자, 상환 불필요</strong>인 순수 지원금입니다. 월세를 내는 모든 청년이라면 한 번쯤 확인해 볼 만한 제도입니다.</p>

<img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" alt="청년들의 주거 공간" class="w-full rounded-xl my-6 object-cover h-64">

<h2>신청 자격: 내가 해당되는지 3분 체크</h2>
<p>자격 조건은 크게 연령, 주택 소유 여부, 세대주(세대원) 분리 여부, 소득 기준, 자산 기준으로 나뉩니다. 하나씩 확인해 보겠습니다.</p>

<h3>연령 및 세대 조건</h3>
<p>신청일 기준 <strong>만 19세 이상 ~ 만 34세 이하</strong>의 청년이어야 합니다. 또한 반드시 <strong>세대주(혹은 세대원으로서 별도 세대)</strong>로 등록되어 있어야 합니다. 부모님과 같은 세대로 등록되어 있으면 안 됩니다. 주민등록등본상 세대 분리가 필수입니다.</p>

<h3>주택 소유 여부</h3>
<p>신청자 본인, 배우자, 그리고 동일 세대원 전원이 <strong>무주택자</strong>여야 합니다. 전세나 월세로 거주 중이신 분들만 해당됩니다. 단, 농어촌 지역의 작은 주택(공시가격 1억 원 이하, 면적 60㎡ 이하) 1채는 예외로 인정됩니다.</p>

<h3>소득 기준</h3>
<p>소득 기준은 <strong>청년 세대(본인 세대)와 원 세대(부모님 세대)</strong> 중 더 높은 쪽을 기준으로 적용합니다.</p>

<table class="w-full text-sm my-6 border-collapse">
  <thead class="bg-gray-100">
    <tr>
      <th class="p-3 text-left border">구분</th>
      <th class="p-3 text-left border">소득 기준</th>
      <th class="p-3 text-left border">해설</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border">청년 세대</td>
      <td class="p-3 border">중위소득의 <strong>60% 이하</strong></td>
      <td class="p-3 border">2026년 기준 1인 가구 약 161만 원/월, 2인 가구 약 274만 원/월</td>
    </tr>
    <tr>
      <td class="p-3 border">원 세대(부모님)</td>
      <td class="p-3 border">중위소득의 <strong>100% 이하</strong></td>
      <td class="p-3 border">2026년 기준 4인 가구 약 627만 원/월</td>
    </tr>
  </tbody>
</table>

<p>즉, 내 소득이 중위소득 60%를 넘으면 안 되고, 부모님 세대 소득이 중위소득 100%를 넘으면 안 됩니다. 둘 중 하나라도 초과하면 탈락합니다.</p>

<h3>자산 기준</h3>
<p>자동차는 <strong>3,500만 원 이하</strong>만 인정되며, 금융 자산은 <strong>5,000만 원 이하</strong>여야 합니다. 부동산은 앞서 말씀드린 대로 전원 무주택이어야 합니다.</p>

<h2>지원금액: 소득에 따라 달라지는 지원액</h2>
<p>청년월세 특별지원은 소득이 낮을수록 더 많은 금액을 지원받습니다. 소득 구간별 지원액은 다음과 같습니다.</p>

<table class="w-full text-sm my-6 border-collapse">
  <thead class="bg-gray-100">
    <tr>
      <th class="p-3 text-left border">소득 구간</th>
      <th class="p-3 text-left border">기준</th>
      <th class="p-3 text-left border">월 지원액</th>
      <th class="p-3 text-left border">최대 지원 기간</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border">기초생활수급자</td>
      <td class="p-3 border">중위소득 30% 이하</td>
      <td class="p-3 border"><strong>월 20만 원</strong></td>
      <td class="p-3 border">12개월</td>
    </tr>
    <tr>
      <td class="p-3 border">차상위계층</td>
      <td class="p-3 border">중위소득 50% 이하</td>
      <td class="p-3 border"><strong>월 20만 원</strong></td>
      <td class="p-3 border">12개월</td>
    </tr>
    <tr>
      <td class="p-3 border">일반 저소득</td>
      <td class="p-3 border">중위소득 60% 이하</td>
      <td class="p-3 border"><strong>월 17만 원</strong></td>
      <td class="p-3 border">12개월</td>
    </tr>
  </tbody>
</table>

<p>2026년 기준 <strong>신규 신청자는 일반 저소득 구간에서도 월 20만 원</strong>을 지원받을 수 있도록 확대된 지역(일부 광역시)도 있으니, 관할 주택도시보증공사(HUG) 또는 LH 홈페이지에서 지역별 세부 기준을 꼭 확인하세요.</p>

<h2>신청 방법: 온라인 vs 오프라인</h2>

<h3>온라인 신청 (추천)</h3>
<ul class="list-disc pl-5 space-y-2 my-4">
  <li>LH 청약센터(<a href="https://apply.lh.or.kr">apply.lh.or.kr</a>) 또는 주택도시보증공사(HUG) 홈페이지에 접속합니다.</li>
  <li>공인인증서(또는 간편인증)로 로그인합니다.</li>
  <li>「청년월세 특별지원」 메뉴를 선택하고 신청서를 작성합니다.</li>
  <li>필요 서류를 스캔하여 첨부하거나, 자동 연계(건강보험, 국세청)로 대체합니다.</li>
  <li>신청 완료 후 접수번호를 반드시 저장합니다.</li>
</ul>

<h3>오프라인 신청</h3>
<ul class="list-disc pl-5 space-y-2 my-4">
  <li>관할 <strong>LH 지역본부</strong> 또는 <strong>주택도시보증공사 지사</strong>를 방문합니다.</li>
  <li>신청서를 작성하고 준비 서류를 제출합니다.</li>
  <li>방문 전에 전화(1600-1004)로 예약하면 대기 시간을 줄일 수 있습니다.</li>
</ul>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
  <p>💡 <strong>꿀팁:</strong> 온라인 신청 시 건강보험자격득실확인서와 소득금액증명원은 정부24 자동연계로 제출할 수 있어요. 따로 떼러 가지 않아도 됩니다!</p>
</div>

<h2>필요 서류 체크리스트</h2>
<ul class="list-disc pl-5 space-y-2 my-4">
  <li>신분증(주민등록증 또는 운전면허증)</li>
  <li>임대차계약서 사본(임대인과 임차인 서명/날인 완료된 것)</li>
  <li>통장사본(지원금 수령 계좌)</li>
  <li>소득금액증명원(자동연계 가능)</li>
  <li>건강보험자격득실확인서(자동연계 가능)</li>
  <li>자동차등록증 사본(차량 소유 시)</li>
  <li>가족관계증명서(자녀가 있을 경우 동거 여부 확인)</li>
</ul>

<h2>선정 기준과 우선 순위</h2>
<p>청년월세 특별지원은 예산 한도 내에서 선착순이 아닌, <strong>소득이 낮을수록 우선 선정</strong>됩니다. 기초생활수급자와 차상위계층이 1순위이며, 일반 저소득 청년은 소득이 낮은 순으로 추첨(또는 순위 배정)됩니다.</p>
<p>지원금은 신청 월의 <strong>다음 달 25일경</strong>에 지정 계좌로 입금됩니다. 예를 들어 5월에 신청하고 선정되면, 6월 25일경 첫 지원금을 받게 됩니다.</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
  <p>⚠️ <strong>주의:</strong> 반드시 <strong>임대차계약서에 임대인(집주인) 서명/날인</strong>이 있어야 합니다. 미날인 계약서는 무효로 처리될 수 있으며, 이 경우 보증금 임대차계약증명(확정일자 받은 것)으로 대체 가능합니다. 또한 계약 기간이 <strong>6개월 이상</strong> 남아 있어야 신청 가능합니다.</p>
</div>

<h2>자주 묻는 질문 (FAQ)</h2>

<h3>월세가 15만 원인데, 20만 원을 받을 수 있나요?</h3>
<p>네, 가능합니다. 지원금은 실제 월세와 상관없이 정액으로 지급됩니다. 월세 15만 원 내시는 분도 <strong>월 20만 원을 전액 수령</strong>할 수 있어요. 다만 전세금을 월세로 전환해서 사는 경우(전세 대출로 월세를 대신 내는 경우)는 지원 대상이 아닙니다.</p>

<h3>선정된 후 월세를 다른 집으로 옮기면 어떻게 되나요?</h3>
<p>주소 변경 시 즉시 LH 또는 HUG에 신고해야 합니다. 새로운 집도 임대차계약서를 다시 제출해야 하며, <strong>변경 신고를 하지 않으면 지원금 지급이 중단</strong>되고 이미 받은 금액을 반납해야 할 수 있습니다.</p>

<h3>대학생도 신청할 수 있나요?</h3>
<p>네, 만 19세 이상 ~ 34세 이하라면 대학생, 취업 준비생, 직장인 모두 신청 가능합니다. 단, 세대주(또는 별도 세대) 등록과 무주택 조건, 소득·자산 기준을 충족해야 합니다. 기숙사에 거주 중이라면 기숙사비 납부 영수증으로 월세를 대신 증명할 수 있습니다.</p>`
  },
  {
    id: "3",
    title: "청년 주택드림 청약통장 혜택과 가입 조건",
    slug: "youth-housing-dream-account",
    date: "2026-05-15",
    summary: "청년들의 내 집 마련을 돕는 청약통장의 혜택과 일반 청약통장과의 차이점을 비교합니다.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    category: "주거·청년",
    readTime: "8분",
    content: `<h2>청년 주택드림 청약통장이란?</h2>
<p>청년 주택드림 청약통장(이하 '주택드림통장')은 <strong>만 19세~34세 청년</strong>이 내 집 마련을 위해 돈을 모을 때 국가가 파격적인 금리와 세제 혜택, 대출 우대까지 제공하는 특별 청약 상품입니다. 일반 청약통장과 비슷해 보이지만, <strong>금리가 훨씬 높고 세금 혜택이 크며 대출 연계</strong>까지 된다는 점에서 차원이 다른 상품입니다.</p>
<p>이 통장은 2023년에 출시되어 2026년 현재까지 많은 청년들이 가입하고 있으며, 정부는 지속적으로 한도와 혜택을 확대하고 있습니다.</p>

<img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80" alt="청년 주택 마련을 위한 저금" class="w-full rounded-xl my-6 object-cover h-64">

<h2>주택드림통장의 3대 혜택</h2>

<h3>1. 파격적인 금리: 최고 연 4.5%</h3>
<p>2026년 기준 주택드림통장의 기본 금리는 <strong>연 2.5% 내외</strong>이며, 우대 조건(급여 이체, 카드 사용 등)을 충족하면 <strong>최고 연 4.5%</strong>까지 받을 수 있습니다. 시중 일반 정기예금 금리(연 2~3%)와 비교해도 월등히 높은 수준입니다.</p>

<h3>2. 소득공제: 납입액의 40% 세액공제</h3>
<p>매년 납입한 금액의 <strong>40%를 소득공제(세액공제)</strong>받을 수 있습니다. 연 납입 한도는 <strong>300만 원</strong>이므로, 최대 <strong>120만 원(300만 원 × 40%)</strong>의 세금을 돌려받을 수 있습니다. 소득이 높아서 세금을 많이 내는 직장인일수록 혜택이 큽니다.</p>

<h3>3. 주택 구매 연계 대출: 낮은 금리로 집 사기</h3>
<p>주택드림통장을 2년 이상 유지하고 주택을 구매하면 <strong>연 1~2%대의 특례보금자리론</strong>을 신청할 수 있습니다. 최대 대출 한도는 2억 5천만 원(수도권)이며, 기존 주택담보대출 금리(연 5~6%)와 비교하면 막대한 이자 절약 효과가 있습니다.</p>

<table class="w-full text-sm my-6 border-collapse">
  <thead class="bg-gray-100">
    <tr>
      <th class="p-3 text-left border">구분</th>
      <th class="p-3 text-left border">주택드림통장</th>
      <th class="p-3 text-left border">일반 청약통장</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border">대상 연령</td>
      <td class="p-3 border">만 19~34세</td>
      <td class="p-3 border">제한 없음</td>
    </tr>
    <tr>
      <td class="p-3 border">금리</td>
      <td class="p-3 border"><strong>최고 연 4.5%</strong></td>
      <td class="p-3 border">연 1.5~2.5%</td>
    </tr>
    <tr>
      <td class="p-3 border">세제 혜택</td>
      <td class="p-3 border"><strong>연 300만 원 한도 40% 세액공제</strong></td>
      <td class="p-3 border">없음</td>
    </tr>
    <tr>
      <td class="p-3 border">대출 연계</td>
      <td class="p-3 border"><strong>특례보금자리론 신청 가능</strong></td>
      <td class="p-3 border">없음</td>
    </tr>
    <tr>
      <td class="p-3 border">월 납입 한도</td>
      <td class="p-3 border">월 50만 원</td>
      <td class="p-3 border">월 25만 원 (1종), 월 50만 원 (2종)</td>
    </tr>
    <tr>
      <td class="p-3 border">가입 기간 제한</td>
      <td class="p-3 border">만 34세까지 가입 가능, 만 39세까지 유지 가능</td>
      <td class="p-3 border">없음</td>
    </tr>
  </tbody>
</table>

<h2>가입 조건: 내가 가입할 수 있을까?</h2>

<ul class="list-disc pl-5 space-y-2 my-4">
  <li><strong>연령:</strong> 가입일 기준 만 19세 이상 ~ 만 34세 이하</li>
  <li><strong>소득:</strong> 연 소득 <strong>5천만 원 이하</strong>(근로·사업소득 합산)</li>
  <li><strong>주택 소유:</strong> 본인과 배우자 모두 <strong>무주택자</strong></li>
  <li><strong>중복 가입:</strong> 일반 청약통장과 중복 가입 불가(택1)</li>
</ul>

<p>연 소득 5천만 원 기준은 <strong>세전 연봉</strong>입니다. 월급으로 환산하면 약 416만 원이니 참고하세요. 연봉 5,500만 원이라면 가입이 불가능합니다.</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
  <p>⚠️ <strong>주의:</strong> 소득 기준은 <strong>가입 당시</strong>뿐만 아니라 <strong>매년 말(12월)에도 검증</strong>됩니다. 가입 후 연봉이 5천만 원을 초과하면 다음 해 혜택(세액공제, 우대금리)이 제한되거나 통장이 일반 통장으로 전환될 수 있으니 소득 변동이 있을 경우 반드시 확인하세요.</p>
</div>

<h2>어디서 가입하나요? 가입 가능 은행</h2>
<p>주택드림통장은 다음 은행에서 가입할 수 있습니다. 각 은행별로 금리 조건과 우대 조건이 조금씩 다르므로 비교해 보세요.</p>

<ul class="list-disc pl-5 space-y-2 my-4">
  <li>KB국민은행</li>
  <li>신한은행</li>
  <li>우리은행</li>
  <li>하나은행</li>
  <li>NH농협은행</li>
  <li>IBK기업은행</li>
  <li>케이뱅크 (인터넷은행)</li>
  <li>카카오뱅크 (인터넷은행)</li>
  <li>토스뱅크 (인터넷은행)</li>
</ul>

<p>인터넷은행(케이뱅크, 카카오뱅크, 토스뱅크)은 <strong>비대면으로 10분이면 가입 완료</strong>되어 편리합니다. 처음 가입하시는 분들은 인터넷은행을 추천드립니다.</p>

<h2>월 납입 한도와 가입 팁</h2>
<p>주택드림통장은 <strong>월 최대 50만 원</strong>까지 납입할 수 있습니다. 하지만 연간 세액공제 한도가 300만 원(월 25만 원 × 12개월)이므로, <strong>세제 혜택만 노린다면 월 25만 원씩</strong> 넣는 것이 효율적입니다.</p>
<p>월 50만 원을 다 넣으면 2년 만에 <strong>1,200만 원</strong>을 모을 수 있습니다. 거기에 세액공제 240만 원(2년치)까지 합치면 실제로는 1,440만 원의 효과를 볼 수 있습니다.</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
  <p>💡 <strong>꿀팁:</strong> 일반 청약통장을 이미 가입 중이라면, 주택드림통장으로 전환하는 것을 강력히 추천합니다. 전환 시 기존 납입 기간이 <strong>70%만 인정</strong>되지만(24개월 납입 시 17개월 인정), 금리와 세제 혜택 차이가 워낙 커서 전환이 유리합니다.</p>
</div>

<h2>대출 혜택 상세: 특례보금자리론</h2>
<p>주택드림통장의 가장 큰 메리트는 주택 구매 시 적용되는 대출 혜택입니다. 가입 기간과 납입 횟수에 따라 대출 조건이 달라집니다.</p>

<table class="w-full text-sm my-6 border-collapse">
  <thead class="bg-gray-100">
    <tr>
      <th class="p-3 text-left border">가입 기간</th>
      <th class="p-3 text-left border">납입 횟수</th>
      <th class="p-3 text-left border">대출 금리</th>
      <th class="p-3 text-left border">대출 한도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border">2년 이상</td>
      <td class="p-3 border">24회 이상</td>
      <td class="p-3 border">연 1.8~2.3%</td>
      <td class="p-3 border">수도권 최대 2억 5천만 원</td>
    </tr>
    <tr>
      <td class="p-3 border">3년 이상</td>
      <td class="p-3 border">36회 이상</td>
      <td class="p-3 border">연 1.5~2.0%</td>
      <td class="p-3 border">수도권 최대 2억 5천만 원</td>
    </tr>
  </tbody>
</table>

<p>예를 들어 수도권에 5억 원짜리 아파트를 산다고 가정하면, 일반 주택담보대출(연 5.5%)로 2억 5천만 원을 빌리면 30년 만기 시 총 이자가 약 2억 6천만 원입니다. 반면 특례보금자리론(연 2.0%)을 쓰면 총 이자가 약 <strong>8,200만 원</strong>으로, <strong>약 1억 8천만 원의 이자를 절약</strong>할 수 있습니다.</p>

<h2>자주 묻는 질문 (FAQ)</h2>

<h3>일반 청약통장에서 전환하면 기존 납입 기간은 어떻게 되나요?</h3>
<p>전환 시 기존 납입 기간의 <strong>70%만 인정</strong>됩니다. 예를 들어 일반 통장을 30개월 유지했다면, 주택드림통장으로 전환 후 21개월(30×0.7)이 인정됩니다. 나머지 3개월만 더 납입하면 2년 기준 대출 혜택을 받을 수 있습니다.</p>

<h3>가입 후 연봉이 6천만 원이 되면 어떻게 되나요?</h3>
<p>연말 소득 검증 시 초과가 확인되면 다음 연도부터 <strong>세액공제와 우대금리 적용이 중단</strong>됩니다. 통장은 유지되지만 일반 정기적금 수준의 금리만 적용됩니다. 주택 구매 대출 혜택은 이미 충족한 가입 기간만큼은 그대로 인정됩니다.</p>

<h3>중도 해지하면 불이익이 있나요?</h3>
<p>네, 중도 해지 시 기존에 받은 <strong>세액공제 금액을 반납(추징)</strong>해야 할 수 있습니다. 또한 가입 기간이 리셋되므로 대출 혜택도 초기화됩니다. 꼭 필요한 경우가 아니라면 만기까지 유지하시는 것을 권장합니다.</p>`
  },
  {
    id: "4",
    title: "고금리 파킹통장 똑똑하게 고르는 법",
    slug: "how-to-choose-parking-account",
    date: "2026-05-18",
    summary: "잠시 묶어두는 돈도 이자를 최대로 받는 파킹통장 선택 기준을 제시합니다.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
    category: "금융",
    readTime: "6분",
    content: `<h2>파킹통장이란 무엇인가요?</h2>
<p>파킹통장(Parking Account)은 잠깐동안 쓰지 않는 돈을 <strong>"주차"</strong>시켜두는 통장입니다. 예금과 적금 중간 형태로, 언제든 입출금이 자유롭고(예금처럼), 그래도 나쁘지 않은 이자(적금 수준)를 주는 상품입니다.</p>
<p>투자할 때 매수 타이밍을 기다리는 돈, 한 달 뒤에 낼 세금, 다음 달에 살 가전제품 비용 등 <strong>단기간(몇 주~몇 달) 묶어둘 돈</strong>을 넣어두기에 딱 좋습니다. 보통 예금보다 금리가 높고, 적금보다 자유롭습니다.</p>

<img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80" alt="금융 계산과 저축" class="w-full rounded-xl my-6 object-cover h-64">

<h2>파킹통장 고르는 4가지 핵심 기준</h2>

<h3>1. 기본금리 vs 우대금리: 진짜 받는 금리를 확인하세요</h3>
<p>은행 홈페이지에는 "최고 연 5.0%"라고 크게 쓰여 있지만, 실제로는 <strong>기본금리(연 2~3%)에 우대금리(연 2~3%)를 더한 것</strong>입니다. 우대금리를 받으려면 조건(급여 이체, 카드 사용, 적금 가입 등)을 충족해야 합니다. 내가 그 조건을 만족할 수 있는지 현실적으로 판단하세요.</p>

<h3>2. 조건 확인: 우대금리를 받기 위한 조건이 현실적인가?</h3>
<p>우대금리 조건으로 "월 100만 원 이상 카드 사용"이 있다면, 평소 카드 사용액이 30만 원뿐인 분은 사실상 무의미한 조건입니다. <strong>내 생활 패턴에 맞는 조건</strong>을 선택하세요. 급여 이체만으로 우대금리가 주어지는 상품이 가장 무난합니다.</p>

<h3>3. 예금자보호: 5천만 원 한도 내인가?</h3>
<p>모든 파킹통장은 <strong>예금자보호법에 따라 1금융권은 5천만 원, 저축은행은 5천만 원(원금 + 이자 합산)</strong>까지 보호됩니다. 하지만 투자성 상품(파킹펀드, CMA 등)은 예금자보호 대상이 아니므로 <strong>꼭 "예금" 또는 "적금" 상품인지 확인</strong>하셔야 합니다.</p>

<h3>4. 세금: 이자소득세 15.4%</h3>
<p>파킹통장 이자에는 <strong>이자소득세 15.4%(소득세 14% + 지방소득세 1.4%)</strong>가 원천징수됩니다. 연 이자 소득이 2천만 원 이하라면 세금은 동일하므로, 세금 때문에 어떤 상품을 고르는 데 큰 영향은 없습니다. 단, 연 이자 2천만 원을 초과하면 종합소득세 신고가 필요할 수 있습니다.</p>

<table class="w-full text-sm my-6 border-collapse">
  <thead class="bg-gray-100">
    <tr>
      <th class="p-3 text-left border">은행 구분</th>
      <th class="p-3 text-left border">상품 예시</th>
      <th class="p-3 text-left border">기본금리</th>
      <th class="p-3 text-left border">최고금리(우대포함)</th>
      <th class="p-3 text-left border">주요 우대 조건</th>
      <th class="p-3 text-left border">예금자보호</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border">인터넷은행</td>
      <td class="p-3 border">카카오뱅크 세이프박스</td>
      <td class="p-3 border">연 3.0%</td>
      <td class="p-3 border"><strong>연 4.5%</strong></td>
      <td class="p-3 border">급여 이체 + 카카오뱅크 체크카드 월 30만 원 사용</td>
      <td class="p-3 border">5천만 원</td>
    </tr>
    <tr>
      <td class="p-3 border">인터넷은행</td>
      <td class="p-3 border">케이뱅크 주거래우대통장</td>
      <td class="p-3 border">연 2.8%</td>
      <td class="p-3 border"><strong>연 4.3%</strong></td>
      <td class="p-3 border">급여 이체 + 케이뱅크 카드 월 20만 원 사용</td>
      <td class="p-3 border">5천만 원</td>
    </tr>
    <tr>
      <td class="p-3 border">저축은행</td>
      <td class="p-3 border">SBI저축은행 파킹예금</td>
      <td class="p-3 border">연 3.5%</td>
      <td class="p-3 border"><strong>연 4.8%</strong></td>
      <td class="p-3 border">비대면 가입 + 자동이체 설정</td>
      <td class="p-3 border">5천만 원</td>
    </tr>
    <tr>
      <td class="p-3 border">저축은행</td>
      <td class="p-3 border">OK저축은행 비대면파킹</td>
      <td class="p-3 border">연 3.2%</td>
      <td class="p-3 border"><strong>연 4.5%</strong></td>
      <td class="p-3 border">비대면 가입 + OK저축은행 앱 로그인</td>
      <td class="p-3 border">5천만 원</td>
    </tr>
    <tr>
      <td class="p-3 border">시중은행</td>
      <td class="p-3 border">KB국민은행 주거래우대통장</td>
      <td class="p-3 border">연 1.5%</td>
      <td class="p-3 border"><strong>연 3.5%</strong></td>
      <td class="p-3 border">KB급여이체 + KB카드 월 50만 원 사용</td>
      <td class="p-3 border">5천만 원</td>
    </tr>
    <tr>
      <td class="p-3 border">시중은행</td>
      <td class="p-3 border">신한은행 쏠편한입출금</td>
      <td class="p-3 border">연 1.8%</td>
      <td class="p-3 border"><strong>연 3.8%</strong></td>
      <td class="p-3 border">신한 급여이체 + 자동이체 3건 이상</td>
      <td class="p-3 border">5천만 원</td>
    </tr>
  </tbody>
</table>

<p>※ 2026년 5월 기준 대표 상품이며, 금리는 수시로 변동될 수 있습니다. 가입 전 반드시 은행 홈페이지에서 최신 금리를 확인하세요.</p>

<h2>우대금리 받는 실전 전략</h2>

<ul class="list-disc pl-5 space-y-2 my-4">
  <li><strong>급여 이체:</strong> 우선 급여를 파킹통장으로 받는 은행을 선택하세요. 대부분의 은행이 급여 이체만으로 기본 우대금리를 제공합니다.</li>
  <li><strong>체크/신용카드 사용:</strong> 해당 은행의 카드를 발급받아 일상 생활비로 사용하면 추가 우대금리를 받습니다. 굳이 더 쓸 필요 없이 원래 쓰던 금액만큼 옮겨 쓰세요.</li>
  <li><strong>자동이체 설정:</strong> 공과금, 보험료, 적금 등을 해당 통장에서 자동이체하면 소액이라도 우대 조건을 충족할 수 있습니다.</li>
  <li><strong>앱 로그인 이벤트:</strong> 인터넷은행은 매일 앱에 접속하는 것만으로도 우대금리를 주는 경우가 있습니다. 1분이면 되니 매일 확인하세요.</li>
</ul>

<h2>이자 계산 예시: 얼마나 벌 수 있을까?</h2>
<p>1,000만 원을 6개월간 파킹통장에 넣는다고 가정해 보겠습니다.</p>

<table class="w-full text-sm my-6 border-collapse">
  <thead class="bg-gray-100">
    <tr>
      <th class="p-3 text-left border">상품 유형</th>
      <th class="p-3 text-left border">금리</th>
      <th class="p-3 text-left border">6개월 세전 이자</th>
      <th class="p-3 text-left border">세후 이자(15.4% 공제)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border">보통예금</td>
      <td class="p-3 border">연 0.5%</td>
      <td class="p-3 border">25,000원</td>
      <td class="p-3 border">21,150원</td>
    </tr>
    <tr>
      <td class="p-3 border">시중은행 파킹</td>
      <td class="p-3 border">연 3.5%</td>
      <td class="p-3 border">175,000원</td>
      <td class="p-3 border">148,050원</td>
    </tr>
    <tr>
      <td class="p-3 border">인터넷은행 파킹</td>
      <td class="p-3 border">연 4.5%</td>
      <td class="p-3 border"><strong>225,000원</strong></td>
      <td class="p-3 border"><strong>190,350원</strong></td>
    </tr>
  </tbody>
</table>

<p>같은 1,000만 원이라도 보통예금에 넣으면 6개월에 2만 원, 인터넷은행 파킹통장에 넣으면 <strong>19만 원</strong>의 이자가 들어옵니다. <strong>9배의 차이</strong>가 나는 셈입니다.</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
  <p>⚠️ <strong>주의:</strong> 파킹통장은 반드시 <strong>"예금" 또는 "적금" 상품</strong>인지 확인하세요. 증권사의 CMA(종합자산관리계좌)나 은행의 MMF(머니마켓펀드)형 상품은 예금자보호 대상이 아닙니다. 상품명에 "예금"이라는 단어가 없다면 반드시 직원에게 "예금자보호가 되는 상품인가요?"라고 확인하세요.</p>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
  <p>💡 <strong>꿀팁:</strong> 파킹통장은 금리가 수시로 변동됩니다. 한 은행에만 집중하지 말고, <strong>분기(3개월)마다 금리를 비교</strong>해 보세요. 더 높은 금리를 주는 은행으로 옮기는 것만으로도 연간 수십만 원의 이자 차이가 날 수 있습니다. 이체는 모바일뱅킹으로 5분이면 끝입니다.</p>
</div>

<h2>자주 묻는 질문 (FAQ)</h2>

<h3>파킹통장에 1억 원을 넣어도 안전한가요?</h3>
<p>예금자보호법상 <strong>1인당 1금융권 기준 5천만 원(원금+이자)</strong>까지만 보호됩니다. 1억 원을 넣으시려면 5천만 원은 A은행, 나머지 5천만 원은 B은행에 나누어 넣는 것이 안전합니다. 저축은행도 별도로 5천만 원씩 보호되므로, 시중은행 5천만 원 + 저축은행 5천만 원 조합도 가능합니다.</p>

<h3>적금이랑 파킹통장이랑 어떤 게 나을까요?</h3>
<p>적금은 <strong>매달 정해진 날짜에 정해진 금액</strong>을 넣어야 하고, 중도 해지 시 이자가 대폭 삭감됩니다. 파킹통장은 <strong>언제든 입출금이 자유롭고</strong> 이자가 매일 쌓입니다. 1년 이상 꾸준히 모을 돈이면 적금이 유리하지만, 몇 달 내에 쓸 돈이거나 금액이 변동적이라면 파킹통장이 훨씬 유연합니다.</p>

<h3>인터넷은행이 시중은행보다 안전한가요?</h3>
<p>네, 인터넷은행(카카오뱅크, 케이뱅크, 토스뱅크)도 <strong>정식 은행 면허를 보유</strong>하고 있으며 예금자보호가 동일하게 적용됩니다. 영업점이 없을 뿐, 금융 안정성은 시중은행과 같습니다. 오히려 비용 절감으로 더 높은 금리를 제공하므로 청년층에게 인기가 많습니다.</p>`
  },
  {
    id: "5",
    title: "육아기 단축근무 급여 계산기 활용 팁",
    slug: "parenting-work-reduction-calculator-tips",
    date: "2026-05-19",
    summary: "육아기 단축근무 시 실제로 내가 받을 수 있는 급여를 정확히 계산하는 방법을 안내합니다.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    category: "육아·복지",
    readTime: "7분",
    content: `<h2>왜 급여 계산기가 필요할까요?</h2>
<p>육아기 단축근무를 신청하기 전, 가장 먼저 드는 생각은 "내가 실제로 얼마를 받게 될까?"일 것입니다. 하지만 이 계산은 생각보다 복잡합니다. <strong>회사가 줄여주는 급여</strong>와 <strong>고용보험이 지원하는 급여</strong>가 따로 들어오기 때문입니다. 두 금액을 따로 계산하고, 세금과 상한액을 고려해야 비로소 실 수령액이 나옵니다.</p>
<p>잘못 계산하면 "생활이 될 줄 알았는데 월급이 너무 줄어서 낭패"를 볼 수 있습니다. 이 글에서는 계산기를 활용해서 <strong>정확한 예상 급여를 미리 파악하는 방법</strong>을 알려드리겠습니다.</p>

<img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80" alt="급여 계산 및 가계부 관리" class="w-full rounded-xl my-6 object-cover h-64">

<h2>계산 전 준비: 필요한 숫자 3가지</h2>
<p>계산기를 쓰기 전에 먼저 아래 3가지 숫자를 준비해야 합니다.</p>

<h3>1. 통상임금 찾기</h3>
<p>통상임금(通常賃金)이란, 근로계약에 정해진 <strong>정기적·일률적으로 지급되는 임금</strong>을 말합니다. 기본급뿐만 아니라, 매달 고정적으로 나오는 <strong>식대, 자녀보육수당, 근속수당, 직책수당</strong> 등도 포함됩니다.</p>
<p>예를 들어 기본급 280만 원, 식대 10만 원, 직책수당 10만 원이 매월 나온다면, 통상임금은 <strong>300만 원</strong>입니다. 상여금, 초과근무수당, 비정기적 보너스는 제외됩니다.</p>

<h3>2. 단축 시간 정하기</h3>
<p>주 15시간, 20시간, 25시간, 30시간, 35시간 중에서 선택합니다. 하루 8시간 기준 주 5일 근무(주 40시간)를 기준으로 합니다. 주 20시간 단축은 하루 4시간씩 줄이는 것이고, 월급은 50%만 회사에서 받게 됩니다.</p>

<h3>3. 고용보험 상한액 확인</h3>
<p>2026년 기준 고용보험 육아기 근로시간 단축 급여의 <strong>일일 상한액은 약 8만 5천 원</strong>, 월 상한액은 <strong>약 177만 원</strong>입니다. 이 금액은 매년 변동되므로 고용노동부 홈페이지에서 최신 자료를 확인하세요.</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
  <p>💡 <strong>꿀팁:</strong> 급여명세서에서 "통상임금" 항목을 찾기 어렵다면, 회사 인사팀에 "육아기 단축근무 신청 시 기준이 되는 통상임금이 얼마인가요?"라고 물어보세요. 인사담당자는 정확한 금액을 알려줘야 할 의무가 있습니다.</p>
</div>

<h2>급여 계산 공식 완벽 이해</h2>
<p>육아기 단축근무 시 급여는 다음 공식으로 계산됩니다.</p>

<p><strong>[회사 지급액] = 통상임금 × (단축 후 근무시간 ÷ 40)</strong></p>
<p><strong>[고용보험 지원액] = 통상임금 × (단축시간 ÷ 40) × 80%</strong></p>
<p>단, 고용보험 지원액은 <strong>월 상한액(2026년 기준 약 177만 원)을 초과할 수 없습니다.</strong></p>

<p>쉽게 말해, <strong>회사는 일한 만큼만 주고, 안 나온 시간의 80%는 고용보험이 대신 채워주는</strong> 구조입니다. 따라서 원래 월급의 80~90% 수준을 유지할 수 있습니다.</p>

<h2>월급별 계산 예시 테이블</h2>
<p>아래 표는 2026년 기준, 주 20시간 단축(50% 감축)을 가정한 예시입니다.</p>

<table class="w-full text-sm my-6 border-collapse">
  <thead class="bg-gray-100">
    <tr>
      <th class="p-3 text-left border">통상월급</th>
      <th class="p-3 text-left border">단축 후 회사 지급</th>
      <th class="p-3 text-left border">고용보험 지원액(80%)</th>
      <th class="p-3 text-left border">총 세전 급여</th>
      <th class="p-3 text-left border">원급 대비 유지율</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border"><strong>월 300만 원</strong></td>
      <td class="p-3 border">150만 원</td>
      <td class="p-3 border">120만 원</td>
      <td class="p-3 border"><strong>270만 원</strong></td>
      <td class="p-3 border">90%</td>
    </tr>
    <tr>
      <td class="p-3 border"><strong>월 400만 원</strong></td>
      <td class="p-3 border">200만 원</td>
      <td class="p-3 border">160만 원</td>
      <td class="p-3 border"><strong>360만 원</strong></td>
      <td class="p-3 border">90%</td>
    </tr>
    <tr>
      <td class="p-3 border"><strong>월 500만 원</strong></td>
      <td class="p-3 border">250만 원</td>
      <td class="p-3 border">177만 원<br><span class="text-xs text-gray-500">(상한액 초과로 일부 제한)</span></td>
      <td class="p-3 border"><strong>427만 원</strong></td>
      <td class="p-3 border">85.4%</td>
    </tr>
  </tbody>
</table>

<p>월 300만 원과 400만 원은 상한액에 걸리지 않아 원래 급여의 정확히 90%를 유지합니다. 하지만 <strong>월 500만 원은 고용보험 지원액이 상한액(약 177만 원)에 걸려</strong> 원래 급여의 85.4%까지만 유지됩니다.</p>

<h3>주 30시간 단축(25% 감축) 시 비교</h3>
<table class="w-full text-sm my-6 border-collapse">
  <thead class="bg-gray-100">
    <tr>
      <th class="p-3 text-left border">통상월급</th>
      <th class="p-3 text-left border">회사 지급(75%)</th>
      <th class="p-3 text-left border">고용보험 지원(20%)</th>
      <th class="p-3 text-left border">총 세전 급여</th>
      <th class="p-3 text-left border">유지율</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border"><strong>월 300만 원</strong></td>
      <td class="p-3 border">225만 원</td>
      <td class="p-3 border">60만 원</td>
      <td class="p-3 border"><strong>285만 원</strong></td>
      <td class="p-3 border">95%</td>
    </tr>
    <tr>
      <td class="p-3 border"><strong>월 400만 원</strong></td>
      <td class="p-3 border">300만 원</td>
      <td class="p-3 border">80만 원</td>
      <td class="p-3 border"><strong>380만 원</strong></td>
      <td class="p-3 border">95%</td>
    </tr>
    <tr>
      <td class="p-3 border"><strong>월 500만 원</strong></td>
      <td class="p-3 border">375만 원</td>
      <td class="p-3 border">100만 원</td>
      <td class="p-3 border"><strong>475만 원</strong></td>
      <td class="p-3 border">95%</td>
    </tr>
  </tbody>
</table>

<p>보시다시피 단축 시간이 적을수록(주 30시간 vs 주 20시간) 원래 급여 유지율이 높아집니다. 하지만 그만큼 회사에 나가는 시간도 늘어나니, <strong>가계 상황과 아이 돌봄 시간을 모두 고려</strong>해서 선택하세요.</p>

<h2>LifeFit 계산기 활용법</h2>
<p>LifeFit 사이트의 육아기 단축근무 급여 계산기를 사용하면 위의 복잡한 계산을 몇 초 만에 끝낼 수 있습니다.</p>

<ul class="list-disc pl-5 space-y-2 my-4">
  <li><strong>1단계:</strong> 계산기에 통상월급을 입력합니다. 상여금이나 초과수당은 제외하고 기본급+고정수당만 입력하세요.</li>
  <li><strong>2단계:</strong> 희망하는 단축 시간(15/20/25/30/35시간)을 선택합니다.</li>
  <li><strong>3단계:</strong> "계산하기" 버튼을 누르면 회사 지급액, 고용보험 지원액, 총 세전 급여, 실 수령액(세금 추정)이 한눈에 보입니다.</li>
  <li><strong>4단계:</strong> 다양한 단축 시간을 선택해 비교해 보고, 가계에 가장 적합한 조건을 찾으세요.</li>
</ul>

<h2>실 수령액과 세금 이해하기</h2>
<p>계산기에서 나온 "총 세전 급여"는 세금 전 금액입니다. 실제 통장에 들어오는 돈은 조금 적습니다.</p>
<p>회사에서 받는 급여는 기존과 동일하게 <strong>근로소득세(소득세+지방소득세)와 4대 보험료</strong>가 공제됩니다. 고용보험에서 받는 지원금은 <strong>비과세 소득이 아니므로 소득세 6.6%가 원천징수</strong>됩니다.</p>
<p>따라서 월 300만 원 기준 주 20시간 단축 시:</p>
<ul class="list-disc pl-5 space-y-2 my-4">
  <li>회사 지급 150만 원에서 4대 보험(약 9%) + 소득세 공제 → 약 <strong>132만 원</strong> 수령</li>
  <li>고용보험 지원 120만 원에서 6.6% 세금 공제 → 약 <strong>112만 원</strong> 수령</li>
  <li>총 실 수령액: 약 <strong>244만 원</strong></li>
</ul>

<h2>회사에서 제대로 처리하지 않을 때 대응법</h2>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
  <p>⚠️ <strong>주의:</strong> 회사에서 단축근무를 승인했는데도 급여가 제대로 들어오지 않는 경우, 다음과 같이 대응하세요.</p>
  <ul class="list-disc pl-5 space-y-1 mt-2">
    <li>먼저 인사팀에 "육아기 근로시간 단축 급여 신고가 제대로 되었는지" 확인합니다.</li>
    <li>회사가 고용보험에 신고하지 않았다면, 근로자 본인도 고용센터에 직접 신청할 수 있습니다.</li>
    <li>고용보험 지원금이 누락되었다면 관할 고용센터(1350)로 문의하여 지급 청구를 진행하세요.</li>
    <li>회사가 불법적으로 대우한다면 고용노동부 상담센터(1350) 또는 근로감독관에게 신고할 수 있습니다.</li>
  </ul>
</div>

<h2>자주 묻는 질문 (FAQ)</h2>

<h3>계산기 결과와 실제 급여가 다를 수 있나요?</h3>
<p>네, 가능합니다. 계산기는 통상임금을 기준으로 계산하지만, 실제로는 <strong>상여금 분할 포함 여부, 회사 내부 규정, 세금 공제율</strong>에 따라 차이가 날 수 있습니다. 계산기는 참고용이며, 정확한 금액은 회사 인사팀과 상담하세요.</p>

<h3>고용보험 지원금은 언제 들어오나요?</h3>
<p>회사가 정상적으로 신고했다면, <strong>단축근무 개시일이 속한 달의 다음 달 말일~다다음 달 초</strong>에 입금됩니다. 예를 들어 5월 1일부터 단축근무를 시작하면 6월 말~7월 초에 첫 지원금을 받게 됩니다.</p>

<h3>단축근무 중에 연차를 쓰면 지원금이 줄어드나요?</h3>
<p>연차휴가는 <strong>유급휴가</strong>이므로 단축근무 시간으로 처리되지 않습니다. 연차를 사용한 날은 정상 근무한 것으로 간주되므로, 그날만큼은 고용보험 지원금이 차감되지 않습니다. 하지만 무급휴가를 사용하면 지원금이 차감될 수 있으니 주의하세요.</p>`
  }
];
