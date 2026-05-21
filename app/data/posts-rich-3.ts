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

export const postsPart3: Post[] = [
  {
    id: "11",
    title: "2026년 달라지는 연말정산 청년 혜택",
    slug: "year-end-tax-settlement-youth",
    date: "2026-04-25",
    summary: "청년 근로자가 연말정산에서 더 많은 세금을 환급받기 위해 챙겨야 할 항목들입니다.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    category: "세금·청년",
    readTime: "7분",
    content: `
      <p class="text-gray-700 leading-relaxed my-4">
        연말정산(1년 동안 내야 할 세금을 다시 계산해서 환급받거나 추가로 내는 절차)은 매년 1월부터 2월 사이에 진행됩니다. 특히 <strong>청년 근로자</strong>는 연봉이 낮은 초기에 다양한 세제 혜택을 받을 수 있어, 꼼꼼히 챙기면 수십만 원을 아낄 수 있습니다. 이 글에서는 2026년 연말정산에서 청년이 반드시 확인해야 할 혜택들을 쉽게 정리해 드립니다.
      </p>

      <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="연말정산 서류와 계산기" class="w-full rounded-xl my-6 object-cover h-64">

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">1. 중소기업 근무자 소득세 감면 — 최대 5년간 90% 혜택</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        중소기업(종업원 300인 이하 또는 자본금 80억 원 이하의 기업)에 다니는 청년 근로자는 <strong>근로소득세를 90% 감면</strong>받을 수 있습니다. 이 정책은 청년들이 중소기업에 취업하도록 돕기 위해 만든 것으로, 취업일로부터 최대 5년간 적용됩니다.
      </p>
      <p class="text-gray-700 leading-relaxed my-4">
        다만 감멸받을 수 있는 <strong>연간 한도</strong>가 취업 후 경과 연수에 따라 달라집니다. 예를 들어, 연봉 3,000만 원인 직장인이 1년 차에 이 혜택을 받으면 약 <strong>100만 원 이상</strong>의 세금을 돌려받을 수 있습니다.
      </p>

      <table class="w-full text-sm my-6 border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left border">근무 연수</th>
            <th class="p-3 text-left border">감면율</th>
            <th class="p-3 text-left border">연간 감면 한도</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border">1년 차</td>
            <td class="p-3 border">90%</td>
            <td class="p-3 border"><strong>1,500만 원</strong></td>
          </tr>
          <tr>
            <td class="p-3 border">2년 차</td>
            <td class="p-3 border">90%</td>
            <td class="p-3 border"><strong>1,500만 원</strong></td>
          </tr>
          <tr>
            <td class="p-3 border">3년 차</td>
            <td class="p-3 border">50%</td>
            <td class="p-3 border"><strong>1,500만 원</strong></td>
          </tr>
          <tr>
            <td class="p-3 border">4년 차</td>
            <td class="p-3 border">50%</td>
            <td class="p-3 border"><strong>1,500만 원</strong></td>
          </tr>
          <tr>
            <td class="p-3 border">5년 차</td>
            <td class="p-3 border">50%</td>
            <td class="p-3 border"><strong>1,500만 원</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <p class="text-blue-800"><strong>💡 꿀팁:</strong> 중소기업 감면은 회사에서 자동으로 처리해 주지만, 혹시 누락되었는지 꼭 연말정산 결과를 확인하세요! 회사 인사팀에 "중소기업 청년 감멸 신청했는지" 물어보는 것만으로도 환급금이 달라질 수 있습니다.</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">2. 월세 세액공제 확대 — 월세 낼 때마다 세금 돌려받기</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        집을 사지 못하고 전세(집주인에게 큰 돈을 맡기고 거주하는 방식)나 월세(매달 집세를 내는 방식)로 사는 청년이 늘고 있습니다. 정부는 이런 청년들을 위해 <strong>월세 세액공제(세금을 줄여주는 혜택)</strong>를 확대했습니다.
      </p>
      <p class="text-gray-700 leading-relaxed my-4">
        2026년 연말정산부터는 <strong>무주택 세대주(집이 없어서 세를 내고 사는 사람)</strong>의 경우, 전세자금(전세 보증금) 이자와 월세 납부액을 공제받을 수 있습니다. 전세자금 이자는 연간 납입 이자의 <strong>40%</strong>를, 월세는 연간 납입액의 <strong>12%(최대 750만 원 한도)</strong>를 공제받을 수 있습니다.
      </p>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">필요한 서류</h3>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li>임대차계약서 사본(계약 기간, 보증금, 월세액이 명시된 페이지)</li>
        <li>월세 납부 영수증 또는 이체 내역(은행 통장 내역)</li>
        <li>전세자금 대출 이자 납입 증명서(은행 발급)</li>
        <li>무주택 확인서(주민센터 또는 정부24에서 발급 가능)</li>
      </ul>

      <div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
        <p class="text-amber-800"><strong>⚠️ 주의:</strong> 계약서상 임차인(세를 내는 사람)과 신청인이 동일해야 합니다. 부모님 이름으로 계약되어 있으면 공제받을 수 없으니, 반드시 본인 명의 계약으로 되어 있는지 확인하세요.</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">3. 청년 주택드림 청약통장 세액공제 — 40% 돌려받기</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        집을 사기 위해 돈을 모으는 청약통장(정부가 운영하는 주택 구매 대기 제도)은 청년에게 큰 혜택을 줍니다. 특히 <strong>청년 주택드림 청약통장</strong>은 매월 납입한 금액의 <strong>40%</strong>를 소득공제(소득에서 빼서 세금을 줄이는 것)받을 수 있습니다.
      </p>
      <p class="text-gray-700 leading-relaxed my-4">
        예를 들어 매월 10만 원씩 1년간 넣었다면, 연간 120만 원의 40%인 <strong>48만 원</strong>을 소득에서 뺄 수 있습니다. 세율이 15%라고 가정하면 약 <strong>7만 원</strong>의 세금을 아끼게 됩니다.
      </p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li>가입 대상: 만 19~34세 청년(소득 제한 있음)</li>
        <li>월 납입 한도: <strong>최대 20만 원</strong></li>
        <li>공제 한도: 연간 납입액의 40%, 최대 연 <strong>96만 원</strong> 소득공제</li>
        <li>가입처: 주택도시기금(주택청약) 또는 인터넷으로 신청 가능</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">4. 학자금 대출 이자 공제와 신용카드 공제 꿀팁</h2>
      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">학자금 대출 이자 세액공제</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        대학 시절 학자금 대출(한국장학재단의 등록금 대출 등)을 받았다면, 상환하면서 낸 이자의 <strong>15%</strong>를 세액공제받을 수 있습니다. 예를 들어 1년간 이자로 50만 원을 냈다면, 7만 5천 원의 세금을 줄일 수 있습니다.
      </p>
      <p class="text-gray-700 leading-relaxed my-4">
        필요한 서류는 한국장학재단 홈페이지에서 발급하는 <strong>학자금대출 이자납입증명서</strong> 한 장이면 충분합니다. 연말정산 간소화 서비스에도 자동으로 연동되니 꼭 확인해 보세요.
      </p>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">신용카드 소득공제 — 청년에게 유리한 공제율</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        신용카드·체크카드·현금영수증 사용액을 소득공제받을 수 있습니다. 특히 <strong>체크카드와 현금영수증</strong>은 공제율이 30%로 신용카드(15%)의 2배입니다.
      </p>
      <p class="text-gray-700 leading-relaxed my-4">
        청년 근로자의 경우 연봉의 25%를 초과하는 사용액부터 공제받을 수 있습니다. 예를 들어 연봉 3,000만 원이면 750만 원을 초과하는 부분부터 15~30%를 공제합니다. 따라서 체크카드를 많이 쓸수록 공제 금액이 커집니다.
      </p>

      <table class="w-full text-sm my-6 border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left border">결제 수단</th>
            <th class="p-3 text-left border">공제율</th>
            <th class="p-3 text-left border">청년 특별 공제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border">신용카드</td>
            <td class="p-3 border">15%</td>
            <td class="p-3 border">해당 없음</td>
          </tr>
          <tr>
            <td class="p-3 border">체크카드</td>
            <td class="p-3 border">30%</td>
            <td class="p-3 border">해당 없음</td>
          </tr>
          <tr>
            <td class="p-3 border">현금영수증</td>
            <td class="p-3 border">30%</td>
            <td class="p-3 border">해당 없음</td>
          </tr>
          <tr>
            <td class="p-3 border">전통시장·대중교통</td>
            <td class="p-3 border">40%</td>
            <td class="p-3 border">연간 한도 100만 원</td>
          </tr>
        </tbody>
      </table>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <p class="text-blue-800"><strong>💡 꿀팁:</strong> 대형마트보다 전통시장에서 장을 보면 공제율이 40%로 올라갑니다! 또한 출퇴근 교통비도 현금영수증이나 교통카드로 남기면 연말정산 때 유리합니다.</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">5. 근로장려금과 기부금 공제 — 소득이 낮을수록 꼭 챙기세요</h2>
      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">근로장려금(EITC)</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        근로장려금(근로소득이 적은 가구에 정부가 현금으로 돌려주는 제도)은 소득이 낮은 청년에게 가장 큰 혜택 중 하나입니다. 단독 가구 기준 연 소득 <strong>2,200만 원 이하</strong>, 부부 가구는 <strong>3,800만 원 이하</strong>일 때 신청할 수 있으며, 최대 <strong>300만 원</strong>까지 받을 수 있습니다.
      </p>
      <p class="text-gray-700 leading-relaxed my-4">
        청년 단독 가구는 소득이 적더라도 근로장려금을 놓치는 경우가 많습니다. 꼭 5월 정기 신청 기간에 홈택스 또는 주민센터에서 신청하세요.
      </p>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">기부금 세액공제</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        연말에 사랑의열매 등에 기부한 금액도 공제받을 수 있습니다. 정부 지정 기부금단체에 기부하면 기부액의 <strong>15%</strong>(1,000만 원 초과분은 30%)를 세액공제받습니다. 소액이라도 연말정산 간소화 서비스에서 확인해 보세요.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">6. 연말정산 준비물 체크리스트와 흔한 실수</h2>
      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">준비물 체크리스트</h3>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li>근로소득 원천징수영수증(회사에서 1월에 지급)</li>
        <li>신용카드·체크카드 사용명세서(카드사 앱 또는 연말정산 간소화)</li>
        <li>월세 임대차계약서 및 납부 증빙</li>
        <li>학자금대출 이자납입증명서</li>
        <li>청약통장 납입증명서</li>
        <li>의료비 영수증(본인 부담금 3만 원 초과 분)</li>
        <li>기부금 영수증</li>
        <li>자녀 주민등록등본(자녀 공제가 있는 경우)</li>
        <li>중소기업 감면 확인서(인사팀 문의)</li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">청년이 자주 하는 실수</h3>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li>월세 계약서가 부모님 이름으로 되어 있어 공제 못 받는 경우</li>
        <li>중소기업 근무 중인데 감면 신청을 누락한 경우</li>
        <li>체크카드보다 신용카드를 더 써서 공제율이 낮아진 경우</li>
        <li>근로장려금 신청 기간(5월)을 놓쳐 혜택을 받지 못한 경우</li>
        <li>학자금 이자 공제를 모르고 넘어간 경우</li>
      </ul>

      <div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
        <p class="text-amber-800"><strong>⚠️ 주의:</strong> 연말정산 결과가 "환급"이 아니라 "추가 납부"로 나왔다면, 의료비나 카드 공제를 누락했을 가능성이 높습니다. 국세청 홈택스에서 "연말정산 간소화" 서비스를 다시 한번 꼼꼼히 확인하세요.</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">7. 연말정산 순서 가이드와 자주 묻는 질문</h2>
      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">Step-by-Step 연말정산 가이드</h3>
      <ol class="list-decimal pl-5 space-y-2 my-4">
        <li>1월 초, 회사에서 <strong>근로소득 원천징수영수증</strong>을 받습니다.</li>
        <li>국세청 홈택스 "연말정산 간소화"에서 카드 사용액, 의료비, 기부금 등을 미리 확인합니다.</li>
        <li>회사의 연말정산 프로그램에 필요한 정보를 입력하거나, 연말정산 자동화 서비스를 이용합니다.</li>
        <li>월세, 학자금 이자 등 <strong>간소화에 없는 항목</strong>은 직접 증빙 서류를 제출합니다.</li>
        <li>연말정산 결과(환급 또는 추가 납부)를 확인합니다.</li>
        <li>5월에는 <strong>근로장려금</strong>을 별도로 신청합니다.</li>
      </ol>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">자주 묻는 질문</h3>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 중소기업인데 감면을 받지 못했어요. 어떻게 하나요?</strong><br>A. 국세청 홈택스에서 "소득세 정정신청"을 할 수 있습니다. 취업일부터 적용되며, 최대 5년간 소급 신청도 가능한 경우가 있으니 세무서에 문의하세요.</p>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 전세살이인데 보증금이 높아도 공제받을 수 있나요?</strong><br>A. 전세 보증금 자체는 공제 대상이 아닙니다. 다만 전세자금 대출의 <strong>이자</strong>만 공제받을 수 있으며, 원리금 상환액 중 이자 부분만 해당합니다.</p>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 근로장려금과 중소기업 감면을 동시에 받을 수 있나요?</strong><br>A. 네, 가능합니다. 중소기업 감면은 세액 감면이고 근로장려금은 현금 지급이므로 별도로 신청할 수 있습니다.</p>
    `,
  },
  {
    id: "12",
    title: "자녀 장려금(CTC) 자격 조건과 신청 기간",
    slug: "child-tax-credit-guide",
    date: "2026-04-22",
    summary: "저소득 가구의 자녀 양육을 지원하는 자녀 장려금의 모든 것을 알려드립니다.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    category: "복지·육아",
    readTime: "6분",
    content: `
      <p class="text-gray-700 leading-relaxed my-4">
        아이를 키우는 것은 사랑으로도 부족한 일입니다. 특히 저소득 가구에서는 아이의 교육비, 식비, 간식비 등 매달 나가는 돈이 큰 부담이 됩니다. 정부는 이런 부모님들을 위해 <strong>자녀 장려금(Child Tax Credit, CTC)</strong>이라는 제도를 운영하고 있습니다. 이 제도는 이름에 "세금"이 들어가지만, 실제로는 <strong>현금으로 지급</strong>되는 복지 혜택입니다. 이 글에서는 자녀 장려금이 무엇인지, 누가 받을 수 있는지, 얼마나 받는지, 어떻게 신청하는지를 차근차근 설명합니다.
      </p>

      <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80" alt="아이와 부모의 따뜻한 모습" class="w-full rounded-xl my-6 object-cover h-64">

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">1. 자녀 장려금이란? — 세금 환급이 아닌 현금 지원</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        자녀 장려금(Child Tax Credit, 줄여서 CTC)은 <strong>저소득 근로 가구</strong>가 아동을 양육하는 데 드는 비용을 정부가 일부 지원하는 제도입니다. 이름은 "세액공제"를 닮았지만, 실제 세금을 내지 않아도 <strong>현금으로 지급</strong>되기 때문에 세금과 직접적인 관계가 없습니다.
      </p>
      <p class="text-gray-700 leading-relaxed my-4">
        이 제도는 2018년 도입된 이후 꾸준히 확대되어 왔으며, 2026년 기준으로도 <strong>총소득 4,000만 원 이하 가구</strong>의 자녀를 대상으로 지급됩니다. 자녀의 나이는 <strong>만 18세 미만</strong>이어야 하며, 자녀 1인당 지급됩니다.
      </p>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <p class="text-blue-800"><strong>💡 꿀팁:</strong> 자녀 장려금은 부모 중 한 명만 신청할 수 있습니다. 보통 소득이 더 적은 부모가 신청하면 더 유리할 수 있으니, 부부끼리 상의해서 신청하세요!</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">2. 자격 조건 — 내 가구가 해당되는지 확인하기</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        자녀 장려금을 받기 위해서는 몇 가지 조건을 모두 충족해야 합니다. 하나라도 빠지면 신청이 거절될 수 있으니 꼼꼼히 확인해 주세요.
      </p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>자녀 연령:</strong> 신청 기준일 기준 <strong>만 18세 미만</strong>의 자녀를 양육 중일 것</li>
        <li><strong>가구 총소득:</strong> 전년도 기준 총소득이 <strong>4,000만 원 이하</strong>일 것</li>
        <li><strong>근로소득 요건:</strong> 신청자 본인 또는 배우자의 근로소득이 있어야 함</li>
        <li><strong>거주 요건:</strong> 신청자와 자녀가 모두 대한민국에 거주할 것</li>
        <li><strong>자녀 관계:</strong> 직계비속(자녀, 손자녀 등)으로 실제 양육 중일 것</li>
      </ul>
      <p class="text-gray-700 leading-relaxed my-4">
        여기서 "총소득"은 근로소득뿐만 아니라 사업소득, 부동산 임대소득, 이자·배당소득 등 <strong>모든 소득을 합한 금액</strong>입니다. 따라서 배우자의 소득도 포함되므로 가구 전체의 소득을 파악하는 것이 중요합니다.
      </p>

      <div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
        <p class="text-amber-800"><strong>⚠️ 주의:</strong> 총소득에 사업소득이 포함되는지 모르고 신청했다가 탈락하는 경우가 많습니다. 예를 들어 남편이 회사원이고 아내가 인터넷 쇼핑몰을 하는 경우, 쇼핑몰 매출에서 비용을 뺀 사업소득도 총소득에 포함됩니다.</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">3. 지급 금액 — 자녀 수와 소득에 따라 달라집니다</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        자녀 장려금의 지급액은 <strong>자녀 수</strong>와 <strong>가구 총소득</strong>에 따라 단계적으로 정해집니다. 소득이 적을수록, 자녀가 많을수록 더 많은 금액을 받을 수 있습니다.
      </p>

      <table class="w-full text-sm my-6 border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left border">가구 총소득 구간</th>
            <th class="p-3 text-left border">자녀 1인</th>
            <th class="p-3 text-left border">자녀 2인</th>
            <th class="p-3 text-left border">자녀 3인 이상</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border">2,000만 원 이하</td>
            <td class="p-3 border"><strong>120만 원</strong></td>
            <td class="p-3 border"><strong>180만 원</strong></td>
            <td class="p-3 border"><strong>240만 원</strong></td>
          </tr>
          <tr>
            <td class="p-3 border">2,000~3,000만 원</td>
            <td class="p-3 border"><strong>80만 원</strong></td>
            <td class="p-3 border"><strong>120만 원</strong></td>
            <td class="p-3 border"><strong>160만 원</strong></td>
          </tr>
          <tr>
            <td class="p-3 border">3,000~4,000만 원</td>
            <td class="p-3 border"><strong>40만 원</strong></td>
            <td class="p-3 border"><strong>60만 원</strong></td>
            <td class="p-3 border"><strong>80만 원</strong></td>
          </tr>
          <tr>
            <td class="p-3 border">4,000만 원 초과</td>
            <td class="p-3 border" colspan="3">지급 대상 아님</td>
          </tr>
        </tbody>
      </table>

      <p class="text-gray-700 leading-relaxed my-4">
        예를 들어 두 아이를 키우는 부부의 총소득이 2,800만 원이라면, 자녀 2인에 해당하여 <strong>120만 원</strong>을 받을 수 있습니다. 이 금액은 연간 지급액이며, 일반적으로 한 번에 입금됩니다.
      </p>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">내 예상 금액 계산하기</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        예상 금액을 계산하려면 먼저 지난해 가구의 <strong>총소득</strong>을 확인하세요. 근로소득은 근로소득 원천징수영수증(회사에서 주는 연말정산 서류)에, 사업소득은 종합소득세 신고 내역에 나옵니다. 이 금액을 위 표의 구간과 비교하면 됩니다.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">4. 신청 방법과 기간 — 놓치면 돌려받을 수 없습니다</h2>
      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">정기 신청 기간</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        자녀 장려금은 매년 <strong>5월</strong>에 일괄 신청받습니다. 2026년 지급분은 2026년 5월에 신청하며, 지급 시기는 보통 <strong>6~7월</strong>경입니다. 정확한 일정은 매년 국세청 홈택스 공지사항을 통해 발표됩니다.
      </p>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">신청 방법</h3>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>온라인(홈택스):</strong> 국세청 홈택스(www.hometax.go.kr)에 로그인 후 "자녀 장려금" 메뉴에서 신청. 공인인증서 또는 간편인증 필요</li>
        <li><strong>오프라인(동 주민센터):</strong> 주민등록상 주소지 관할 동 주민센터(동사무소) 방문 신청</li>
        <li><strong>위택스(지방세 홈페이지):</strong> 일부 지자체는 위택스에서도 접수 가능</li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">필요한 서류</h3>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li>신청인 및 배우자의 주민등록증 사본</li>
        <li>자녀의 주민등록등본 또는 가족관계증명서</li>
        <li>신청인 명의 통장 사본(지급받을 계좌)</li>
        <li>근로소득 원천징수영수증(회사 근무자)</li>
        <li>사업소득 증명서(자영업자의 경우)</li>
      </ul>

      <div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
        <p class="text-amber-800"><strong>⚠️ 주의:</strong> 신청 기간을 놓치면 해당 연도 자녀 장려금을 받을 수 없습니다. 예를 들어 2026년 5월 신청을 못 했다면, 2026년분은 영영 지급받지 못합니다. 달력에 5월 1일부터 미리 표시해 두세요!</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">5. 다른 아동 관련 혜택과 비교</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        자녀 장려금 외에도 정부는 다양한 아동 관련 복지 제도를 운영하고 있습니다. 어떤 제도를 받을 수 있는지 한눈에 비교해 보세요.
      </p>

      <table class="w-full text-sm my-6 border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left border">제도명</th>
            <th class="p-3 text-left border">대상</th>
            <th class="p-3 text-left border">지급액(월)</th>
            <th class="p-3 text-left border">신청 시기</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border">자녀 장려금(CTC)</td>
            <td class="p-3 border">총소득 4천만 원 이하, 자녀 18세 미만</td>
            <td class="p-3 border">연간 40~240만 원</td>
            <td class="p-3 border">매년 5월</td>
          </tr>
          <tr>
            <td class="p-3 border">부모급여</td>
            <td class="p-3 border">만 0~1세 아동</td>
            <td class="p-3 border">70만 원(가정양육)</td>
            <td class="p-3 border">출산 후 신청</td>
          </tr>
          <tr>
            <td class="p-3 border">아동수당</td>
            <td class="p-3 border">만 0~7세 아동</td>
            <td class="p-3 border">10~20만 원</td>
            <td class="p-3 border">출산 후 상시</td>
          </tr>
          <tr>
            <td class="p-3 border">보육료 지원(어린이집)</td>
            <td class="p-3 border">만 0~5세, 어린이집 이용</td>
            <td class="p-3 border">전액 또는 일부</td>
            <td class="p-3 border">어린이집 등록 시</td>
          </tr>
        </tbody>
      </table>

      <p class="text-gray-700 leading-relaxed my-4">
        이들 제도는 서로 <strong>중복 수령이 가능</strong>한 경우가 많습니다. 예를 들어 자녀 장려금과 부모급여는 동시에 받을 수 있으니, 가능한 모든 제도를 꼼꼼히 챙기세요.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">6. 자주 묻는 질문</h2>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 자녀 장려금과 근로장려금을 동시에 받을 수 있나요?</strong><br>A. 네, 가능합니다. 두 제도는 별개로 운영되며 조건을 모두 충족하면 두 가지를 모두 받을 수 있습니다.</p>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 이혼한 부모도 신청할 수 있나요?</strong><br>A. 네, 실제 양육하고 있는 부모가 신청할 수 있습니다. 자녀와 동거하며 양육비를 부담하고 있다면 신청 자격이 있습니다.</p>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 소득이 4,000만 원을 살짝 넘었는데 받을 수 없나요?</strong><br>A. 안타깝지만 총소득 기준은 엄격하게 적용됩니다. 4,000만 원을 1원이라도 초과하면 지급 대상에서 제외됩니다.</p>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 자녀가 올해 18세가 되면 받을 수 없나요?</strong><br>A. 신청 기준일(보통 5월 1일) 기준으로 <strong>만 18세 미만</strong>이어야 합니다. 만 18세가 되는 해에는 마지막으로 신청할 수 있습니다.</p>
    `,
  },
  {
    id: "13",
    title: "청년도전지원사업: 구직 단념 청년을 위한 프로그램",
    slug: "youth-challenge-support",
    date: "2026-04-20",
    summary: "구직에 어려움을 겪는 청년들에게 맞춤형 프로그램을 제공하고 수당을 지원하는 사업입니다.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
    category: "청년·일자리",
    readTime: "6분",
    content: `
      <p class="text-gray-700 leading-relaxed my-4">
        구직 활동을 하다 보면 서류 탈락, 면접 실패, 경력 부족 등 다양한 어려움에 부딪힙니다. 이런 과정이 반복되면 점점 자신감을 잃고 "나는 안 되나 봐"라는 생각에 빠지기 쉽습니다. 심지어 구직을 아예 포기하는 <strong>구직 단념 청년</strong>도 늘고 있습니다. 정부는 이런 청년들을 위해 <strong>청년도전지원사업</strong>을 마련했습니다. 이 프로그램은 단순히 돈을 주는 것이 아니라, 청년이 다시 일어설 수 있도록 <strong>심리적 지원, 직업 훈련, 구직 매칭</strong>을 함께 제공합니다.
      </p>

      <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80" alt="청년들이 함께 일하는 모습" class="w-full rounded-xl my-6 object-cover h-64">

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">1. 청년도전지원사업이란? — 다시 시작할 용기를 드립니다</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        청년도전지원사업은 <strong>구직에 지친 청년</strong>들이 다시 구직 의지를 갖고 사회에 진출할 수 있도록 돕는 정부 프로그램입니다. 고용노동부가 주관하며, 전국 고용센터(워크넷)를 통해 운영됩니다.
      </p>
      <p class="text-gray-700 leading-relaxed my-4">
        이 사업의 핵심은 "돈만 주는 것이 아니다"라는 점입니다. 참여자는 3개월간 <strong>자기 이해 프로그램, 직업 훈련, 구직 활동</strong>을 단계적으로 진행하며, 그 과정에서 전문 상담사의 1:1 멘토링도 받습니다. 이를 통해 자신에게 맞는 직업을 찾고, 구직 스킬도 키울 수 있습니다.
      </p>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <p class="text-blue-800"><strong>💡 꿀팁:</strong> 이 프로그램은 "취업 실패 경험이 있는 사람"에게 더 적극적으로 추천됩니다. 면접에서 떨어졌다고 좌절하지 마세요. 오히려 그 경험이 프로그램 신청에 유리할 수 있습니다.</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">2. 누가 신청할 수 있나요? — 자격 요건 확인하기</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        청년도전지원사업은 비교적 명확한 자격 요건을 가지고 있습니다. 다음 조건을 모두 만족해야 신청할 수 있습니다.
      </p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>연령:</strong> 만 18세 이상 ~ 34세 이하</li>
        <li><strong>취업 상태:</strong> 현재 <strong>미취업자</strong>(일용직, 아르바이트도 제한 있음)</li>
        <li><strong>학업 상태:</strong> 학교에 <strong>재학 중이 아닐 것</strong>(휴학생은 가능, 졸업 예정자는 불가)</li>
        <li><strong>훈련 상태:</strong> 다른 정부 지원 훈련 프로그램에 참여 중이 아닐 것</li>
        <li><strong>구직 단념 상태:</strong> 구직 의사는 있으나 실제 활동이 어려운 경우 우선 선발</li>
      </ul>
      <p class="text-gray-700 leading-relaxed my-4">
        "구직 단념"이라는 말이 걱정스러울 수 있습니다. 하지만 이 프로그램은 정확히 그런 사람을 위한 것입니다. 구직활동을 4주 이상 하지 않았거나, 최근 3개월 내 면접 경험이 없는 경우 등이 해당 대상입니다.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">3. 3개월 프로그램 구성 — 어떻게 진행되나요?</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        청년도전지원사업은 총 <strong>3개월(약 12주)</strong> 동안 진행되며, 크게 세 단계로 나뉩니다. 각 단계마다 목표가 다르고, 그에 맞는 활동을 수행합니다.
      </p>

      <table class="w-full text-sm my-6 border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left border">단계</th>
            <th class="p-3 text-left border">주차</th>
            <th class="p-3 text-left border">주요 내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border"><strong>1단계: 자기 이해 및 진로 탐색</strong></td>
            <td class="p-3 border">1~4주차</td>
            <td class="p-3 border">성격 검사, 진로 상담, 희망 직무 탐색, 자기소개서 작성법 교육</td>
          </tr>
          <tr>
            <td class="p-3 border"><strong>2단계: 직업 훈련 및 역량 강화</strong></td>
            <td class="p-3 border">5~8주차</td>
            <td class="p-3 border">직무 교육(IT, 사무, 제조, 서비스 등), 자격증 취득 지원, 면접 연습</td>
          </tr>
          <tr>
            <td class="p-3 border"><strong>3단계: 구직 활동 및 취업 매칭</strong></td>
            <td class="p-3 border">9~12주차</td>
            <td class="p-3 border">기업 매칭, 면접 지원, 취업 후 적응 프로그램</td>
          </tr>
        </tbody>
      </table>

      <p class="text-gray-700 leading-relaxed my-4">
        프로그램은 주로 <strong>고용센터 내 교육장</strong>에서 진행되며, 일부 온라인 강의도 포함됩니다. 참여자는 매주 정해진 시간에 출석해야 하며, 결석이 많으면 수당이 삭감될 수 있습니다.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">4. 지원 금액 — 참여 수당과 취업 성공 수당</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        프로그램 참여 중에는 <strong>참여 수당</strong>이 지급되며, 취업에 성공하면 <strong>취업 성공 수당</strong>이 추가로 지급됩니다. 이는 단순한 용돈이 아니라, 구직 활동에 집중할 수 있도록 돕는 실질적인 지원입니다.
      </p>

      <table class="w-full text-sm my-6 border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left border">지원 항목</th>
            <th class="p-3 text-left border">금액</th>
            <th class="p-3 text-left border">지급 조건</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border">참여 수당(월)</td>
            <td class="p-3 border"><strong>50만 원</strong></td>
            <td class="p-3 border">매월 80% 이상 출석 시 지급</td>
          </tr>
          <tr>
            <td class="p-3 border">취업 성공 수당</td>
            <td class="p-3 border"><strong>150만 원</strong></td>
            <td class="p-3 border">프로그램 수료 후 3개월 내 취업, 6개월 근무 유지 시</td>
          </tr>
          <tr>
            <td class="p-3 border">교통비·식비</td>
            <td class="p-3 border">별도 지원</td>
            <td class="p-3 border">지역 고용센터별 상이</td>
          </tr>
        </tbody>
      </table>

      <p class="text-gray-700 leading-relaxed my-4">
        예를 들어 3개월간 성실히 참여하여 150만 원의 참여 수당을 받고, 프로그램 종료 후 2개월 만에 취업하여 6개월을 근무하면 취업 성공 수당 <strong>150만 원</strong>을 추가로 받게 됩니다. 총 <strong>300만 원</strong>의 지원금을 받는 셈입니다.
      </p>

      <div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
        <p class="text-amber-800"><strong>⚠️ 주의:</strong> 참여 수당은 무조건 지급되는 것이 아닙니다. 월 80% 이상 출석해야 전액을 받을 수 있으며, 50% 미만 출석 시에는 지급이 중단될 수 있습니다. 아르바이트와 병행하면서 신청하려면 일정 조율이 필수입니다.</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">5. 프로그램 분야와 신청 방법</h2>
      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">선택할 수 있는 프로그램 유형</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        청년도전지원사업은 직무 분야별로 다양한 프로그램을 운영합니다. 본인의 흥미와 적성에 맞는 분야를 선택할 수 있습니다.
      </p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>IT·디지털:</strong> 웹 개발, 데이터 분석, UI/UX 디자인, OA(사무자동화) 등</li>
        <li><strong>제조·기술:</strong> 전기·전자, 기계 조작, 품질 관리, 물류 관리 등</li>
        <li><strong>서비스·판매:</strong> 고객 응대, 마케팅, 영업, 호텔·외식 서비스 등</li>
        <li><strong>사무·경영:</strong> 회계, 인사, 총무, 경영 지원 등</li>
        <li><strong>디자인·콘텐츠:</strong> 그래픽 디자인, 영상 편집, 콘텐츠 기획 등</li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">신청 방법</h3>
      <ol class="list-decimal pl-5 space-y-2 my-4">
        <li><strong>워크넷(www.work.go.kr) 접속</strong> → "청년도전지원사업" 검색</li>
        <li>희망하는 프로그램과 지역 선택 후 온라인 신청</li>
        <li>소정의 서류 제출(주민등록증, 최종학력증명서, 구직활동 증빙 등)</li>
        <li>면접 또는 상담 진행(프로그램 적합성 평가)</li>
        <li>합격 발표 후 프로그램 참여 시작</li>
      </ol>

      <p class="text-gray-700 leading-relaxed my-4">
        워크넷 온라인 신청이 어렵다면, <strong>가까운 고용센터</strong>에 직접 방문하여 상담사의 도움을 받을 수도 있습니다. 고용센터에서는 신청서 작성부터 서류 준비까지 안내해 드립니다.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">6. 다른 청년 일자리 프로그램과 비교</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        청년도전지원사업 외에도 다양한 청년 취업 지원 프로그램이 있습니다. 본인의 상황에 맞는 프로그램을 선택하는 것이 중요합니다.
      </p>

      <table class="w-full text-sm my-6 border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left border">프로그램</th>
            <th class="p-3 text-left border">대상</th>
            <th class="p-3 text-left border">지원 내용</th>
            <th class="p-3 text-left border">특징</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border">청년도전지원사업</td>
            <td class="p-3 border">구직 단념 청년</td>
            <td class="p-3 border">훈련 + 수당 + 매칭</td>
            <td class="p-3 border">심리·진로 상담 중심</td>
          </tr>
          <tr>
            <td class="p-3 border">청년내일채움공제</td>
            <td class="p-3 border">중소기업 근무 청년</td>
            <td class="p-3 border">근속 장려금</td>
            <td class="p-3 border">이미 취업한 사람 대상</td>
          </tr>
          <tr>
            <td class="p-3 border">청년 인턴</td>
            <td class="p-3 border">미취업 청년</td>
            <td class="p-3 border">인턴 월급 + 훈련</td>
            <td class="p-3 border">기업 근무 중심</td>
          </tr>
          <tr>
            <td class="p-3 border">K-디지털 트레이닝</td>
            <td class="p-3 border">디지털 직무 희망자</td>
            <td class="p-3 border">무료 직업 훈련</td>
            <td class="p-3 border">훈련비 전액 국가 지원</td>
          </tr>
        </tbody>
      </table>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">7. 성공 사례와 준비물, 자주 묻는 질문</h2>
      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">성공 사례</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        <strong>김민수 씨(26세):</strong> 대학 졸업 후 1년간 구직 활동을 했으나 번번이 면접에서 떨어졌습니다. 자신감을 잃고 집에만 있던 그는 동 주민센터에서 청년도전지원사업을 알게 되었습니다. 프로그램에서 면접 컨설팅과 이력서 첨삭을 받은 후, 3개월 만에 중소 IT 기업에 취업했습니다. 현재는 웹 개발자로 일하며, 취업 성공 수당도 받았습니다.
      </p>
      <p class="text-gray-700 leading-relaxed my-4">
        <strong>이지영 씨(29세):</strong> 휴학 후 복학하지 않고 2년간 아르바이트만 하며 시간을 보냈습니다. "뭘 해야 할지 모르겠다"는 생각에 청년도전지원사업을 신청했고, 자기 이해 프로그램에서 자신이 사람들을 돕는 일에 적성이 있다는 것을 알게 되었습니다. 현재는 고용센터의 연계 프로그램을 통해 사회복지 관련 직무에 종사 중입니다.
      </p>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">필요한 서류</h3>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li>주민등록증 사본</li>
        <li>최종학력증명서(졸업증명서 또는 제적 증명서)</li>
        <li>구직활동 증빙(이력서 제출 확인서, 면접 경력 등 — 없어도 신청 가능)</li>
        <li>건강보험자격득실확인서(건강보험공단 발급)</li>
        <li>통장 사본(수당 지급용)</li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">자주 묻는 질문</h3>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 프로그램 참여 중 아르바이트를 할 수 있나요?</strong><br>A. 주 15시간 이하의 단기 아르바이트는 가능합니다. 다만 프로그램 출석과 병행이 어려울 수 있으니 상담사와 미리 상의하세요.</p>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 프로그램을 수료했는데 취업하지 못하면 어떻게 되나요?</strong><br>A. 수료 후에도 고용센터에서 추가 구직 지원을 받을 수 있습니다. 단 취업 성공 수당은 취업 및 근속 조건을 충족해야 지급됩니다.</p>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 프로그램에 떨어질 수도 있나요?</strong><br>A. 네, 선발 인원에 한도가 있어 떨어질 수도 있습니다. 다만 구직 단념 청년, 저소득 청년일수록 가산점이 부여됩니다.</p>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 프로그램 기간이 3개월인데, 연장할 수 있나요?</strong><br>A. 기본 3개월이며, 일부 지역에서는 심층 취업 지원 프로그램으로 연장되는 경우도 있습니다. 수료 후 상담사와 상의하세요.</p>
    `,
  },
  {
    id: "14",
    title: "2026년 출산지원금 및 부모급여 총정리",
    slug: "birth-support-parent-pay-2026",
    date: "2026-04-15",
    summary: "아이를 출산했을 때 받을 수 있는 첫만남이용권과 부모급여의 최신 정보를 정리했습니다.",
    image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80",
    category: "육아·복지",
    readTime: "8분",
    content: `
      <p class="text-gray-700 leading-relaxed my-4">
        아이가 태어나면 축하할 일도 많지만, 동시에 생각지도 못한 지출이 쏟아집니다. 기저귀, 분유, 아기 옷, 유모차… 모든 것이 처음이기에 어떤 지원을 받을 수 있는지조차 모르는 경우가 많습니다. 정부와 지자체는 출산 가정을 위해 다양한 <strong>출산지원금</strong>과 <strong>부모급여</strong>를 지급하고 있습니다. 이 글에서는 2026년 기준 아이를 출산했을 때 꼭 챙겨야 하는 혜택들을 임신부터 돌(1세)까지의 타임라인과 함께 정리해 드립니다.
      </p>

      <img src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80" alt="아기와 부모의 첫만남" class="w-full rounded-xl my-6 object-cover h-64">

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">1. 첫만남이용권 — 아이와의 첫 선물</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        <strong>첫만남이용권</strong>은 아이가 태어나면 정부가 부모에게 주는 "현금성 바우처(특정 용도로만 사용할 수 있는 상품권)"입니다. 이 이용권은 아기 용품을 살 때 사용할 수 있으며, 출산 순위에 따라 금액이 달라집니다.
      </p>

      <table class="w-full text-sm my-6 border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left border">출산 순위</th>
            <th class="p-3 text-left border">지급 금액</th>
            <th class="p-3 text-left border">사용 가능 품목</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border">첫째</td>
            <td class="p-3 border"><strong>100만 원</strong></td>
            <td class="p-3 border">기저귀, 분유, 아기 옷, 유모차, 카시트 등</td>
          </tr>
          <tr>
            <td class="p-3 border">둘째</td>
            <td class="p-3 border"><strong>120만 원</strong></td>
            <td class="p-3 border">기저귀, 분유, 아기 옷, 유모차, 카시트 등</td>
          </tr>
          <tr>
            <td class="p-3 border">셋째 이상</td>
            <td class="p-3 border"><strong>150만 원</strong></td>
            <td class="p-3 border">기저귀, 분유, 아기 옷, 유모차, 카시트 등</td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">어디에서 무엇을 살 수 있나요?</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        첫만남이용권은 정부가 지정한 <strong>온라인 쇼핑몰(예: 복지용구 쇼핑몰)</strong>에서만 사용할 수 있습니다. 살 수 있는 품목은 기저귀, 분유, 이유식, 아기 의류, 유모차, 아기 침대, 카시트, 젖병, 물티슈 등 아기와 엄마를 위한 다양한 제품들입니다.
      </p>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">신청 방법</h3>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li>출산 후 <strong>정부24(www.gov.kr)</strong> 또는 <strong>복지로(www.bokjiro.go.kr)</strong>에서 온라인 신청</li>
        <li>주민센터(동사무소)에 방문하여 신청</li>
        <li>필요 서류: 출산증명서 또는 출생신고 확인서, 부모 신분증, 통장 사본</li>
        <li>신청 후 약 <strong>2~4주</strong> 내에 문자메시지(SMS)로 이용권 번호 발급</li>
      </ul>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <p class="text-blue-800"><strong>💡 꿀팁:</strong> 첫만남이용권은 아이가 태어난 날로부터 <strong>1년 이내</strong>에 신청해야 합니다. 육아하랴 바쁜 와중에 잊기 쉬우니, 출산 전 미리 정부24 계정을 만들어 두세요.</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">2. 부모급여 — 매달 받는 든든한 지원금</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        <strong>부모급여</strong>는 아이를 직접 키우는 부모에게 매월 현금을 지급하는 제도입니다. 2026년 기준 <strong>만 0세(출생 후 1년)와 만 1세</strong> 아동을 대상으로 지급되며, 아이를 어린이집에 보내는 경우와 집에서 직접 키우는 경우 금액이 다릅니다.
      </p>

      <table class="w-full text-sm my-6 border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left border">아이 나이</th>
            <th class="p-3 text-left border">가정 양육(집에서 키울 때)</th>
            <th class="p-3 text-left border">어린이집 이용 시</th>
            <th class="p-3 text-left border">유치원 이용 시</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border">만 0세</td>
            <td class="p-3 border"><strong>70만 원/월</strong></td>
            <td class="p-3 border"><strong>53만 원/월</strong>(보육료 지원 포함)</td>
            <td class="p-3 border">해당 없음</td>
          </tr>
          <tr>
            <td class="p-3 border">만 1세</td>
            <td class="p-3 border"><strong>70만 원/월</strong></td>
            <td class="p-3 border"><strong>53만 원/월</strong>(보육료 지원 포함)</td>
            <td class="p-3 border">해당 없음</td>
          </tr>
          <tr>
            <td class="p-3 border">만 2세</td>
            <td class="p-3 border">아동수당 10만 원/월</td>
            <td class="p-3 border">보육료 전액 또는 일부 지원</td>
            <td class="p-3 border">유치원 누리과정비 지원</td>
          </tr>
        </tbody>
      </table>

      <p class="text-gray-700 leading-relaxed my-4">
        표에서 보듯이 <strong>가정 양육 시</strong> 금액이 더 높습니다. 이는 직접 아이를 키우는 부모의 기회비용을 보전하기 위한 정책입니다. 다만 어린이집에 보내면 보육료(어린이집 비용)가 별도로 지원되므로, 실제로는 어린이집 이용 시 부모의 부담이 더 적을 수 있습니다.
      </p>

      <div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
        <p class="text-amber-800"><strong>⚠️ 주의:</strong> 부모급여와 보육료 지원은 동시에 받을 수 없습니다. 가정 양육을 선택하면 부모급여 70만 원을 받고, 어린이집을 이용하면 보육료 지원 + 부모급여(차액)를 받게 됩니다. 둘 중 어느 쪽이 유리한지 꼭 계산해 보세요.</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">3. 신청 방법 — 원스톱 서비스로 간편하게</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        출산 관련 혜택은 이제 <strong>원스톱 서비스(한 번의 신청으로 여러 가지 혜택을 동시에 신청하는 제도)</strong>로 편리하게 신청할 수 있습니다. 출생신고를 할 때 동시에 여러 혜택을 신청하면 번거롭게 따로 방문할 필요가 없습니다.
      </p>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">온라인 신청 (정부24)</h3>
      <ol class="list-decimal pl-5 space-y-2 my-4">
        <li>정부24(www.gov.kr)에 로그인(공인인증서 또는 간편인증 필요)</li>
        <li>"출산·육아 원스톱 서비스" 메뉴 선택</li>
        <li>신청할 혜택 선택(부모급여, 아동수당, 첫만남이용권 등)</li>
        <li>아기의 출생정보와 부모 정보 입력</li>
        <li>통장 정보 입력 후 신청 완료</li>
      </ol>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">오프라인 신청 (주민센터)</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        아기를 낳은 병원에서 <strong>출생증명서</strong>를 받은 후, 부모 중 한 명이 주민센터(동사무소)에 방문하면 됩니다. 출생신고와 동시에 부모급여, 아동수당, 첫만남이용권 등을 한 번에 신청할 수 있습니다.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">4. 임신부터 돌까지 — 타임라인으로 보는 혜택</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        아이를 낳기 전부터 돌까지, 언제 어떤 혜택을 신청하면 될까요? 다음 타임라인을 참고하세요.
      </p>

      <table class="w-full text-sm my-6 border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left border">시기</th>
            <th class="p-3 text-left border">신청할 혜택</th>
            <th class="p-3 text-left border">금액/내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border">임신 중</td>
            <td class="p-3 border">산전후휴가급여</td>
            <td class="p-3 border">출산 전후 90일 휴직 + 급여 지원</td>
          </tr>
          <tr>
            <td class="p-3 border">출산 직후</td>
            <td class="p-3 border">첫만남이용권, 부모급여, 아동수당</td>
            <td class="p-3 border">100~150만 원 + 월 70만 원</td>
          </tr>
          <tr>
            <td class="p-3 border">출산 후 3개월 내</td>
            <td class="p-3 border">출산비용 지원(지자체)</td>
            <td class="p-3 border">지자체별 상이(30~100만 원)</td>
          </tr>
          <tr>
            <td class="p-3 border">아빠의 육아휴직</td>
            <td class="p-3 border">육아휴직급여(배우자출산휴가)</td>
            <td class="p-3 border">10일 휴가 + 급여 지원</td>
          </tr>
          <tr>
            <td class="p-3 border">만 0~1세</td>
            <td class="p-3 border">부모급여(계속)</td>
            <td class="p-3 border">월 70만 원(가정양육 기준)</td>
          </tr>
          <tr>
            <td class="p-3 border">만 1~7세</td>
            <td class="p-3 border">아동수당</td>
            <td class="p-3 border">월 10만 원(만 0~7세)</td>
          </tr>
        </tbody>
      </table>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">5. 다른 출산 관련 지원금들</h2>
      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">출산 휴가 급여</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        출산한 여성은 <strong>산전후휴가(출산 전후로 총 90일)</strong>를 사용할 수 있으며, 그중 60일 이상은 급여를 받습니다. 급여액은 통상임금의 100%를 지급받되, 상한액(2026년 기준 월 <strong>233만 원</strong>)이 적용됩니다.
      </p>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">배우자출산휴가(아빠 휴가)</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        아빠도 <strong>10일간의 배우자출산휴가</strong>를 사용할 수 있습니다. 휴가 기간 중 5일은 급여를 지급받으며, 2026년 기준 1일당 <strong>20만 원</strong>이 지급됩니다(상한액 기준).
      </p>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">미숙아·선천성 이상아 지원</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        조산(아기가 예정일보다 일찍 태어나는 것)으로 인해 미숙아가 태어나거나, 선천성 질환이 있는 경우 별도의 <strong>의료비 지원</strong>을 받을 수 있습니다. 병원에서 자동으로 신청되거나, 건강보험공단에 별도 신청이 필요합니다.
      </p>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">지자체 출산지원금</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        각 지방자치단체(시·군·구)는 자체적으로 출산지원금을 지급합니다. 예를 들어 서울시는 첫째 출산 시 30만 원, 둘째 50만 원, 셋째 이상 70만 원을 지급합니다. 지역마다 금액과 기준이 다르므로 <strong>거주 지역 주민센터</strong>에 꼭 문의하세요.
      </p>

      <div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
        <p class="text-amber-800"><strong>⚠️ 주의:</strong> 일부 지자체 출산지원금은 <strong>출산 후 3개월 또는 6개월 이내</strong>에 신청해야 합니다. 기한을 놓치면 지원받을 수 없으니, 출산 후 바로 주민센터에 연락하여 신청 가능 여부를 확인하세요.</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">6. 완벽 체크리스트와 자주 묻는 질문</h2>
      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">출산 후 꼭 챙길 체크리스트</h3>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li>출생신고(출산 후 <strong>1개월 이내</strong>, 주민센터 또는 정부24)</li>
        <li>건강보험 피부양자 등록(아기를 부모의 건강보험에 등록)</li>
        <li>첫만남이용권 신청(출산 후 <strong>1년 이내</strong>)</li>
        <li>부모급여 신청(출산 후 즉시 가능)</li>
        <li>아동수당 신청(출산 후 즉시 가능)</li>
        <li>산전후휴가급여 신청(회사 또는 고용센터)</li>
        <li>배우자출산휴가 신청(아빠의 회사)</li>
        <li>지자체 출산지원금 신청(거주 지역 주민센터)</li>
        <li>어린이집 대기 신청(원하는 경우, 보육통합공 Supply 서비스)</li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">자주 묻는 질문</h3>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 첫만남이용권을 분유 대신 기저귀로 바꿀 수 있나요?</strong><br>A. 네, 가능합니다. 첫만남이용권은 지정 품목 내에서 부모가 원하는 대로 사용할 수 있습니다. 단, 의료비나 부모의 생활비로는 사용할 수 없습니다.</p>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 부모급여는 아빠가 신청해도 되나요?</strong><br>A. 네, 부모 중 한 명이 신청할 수 있습니다. 다만 급여는 신청자 명의의 통장으로 입금되므로, 가계 관리를 위해 부부가 상의해서 결정하세요.</p>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 외국인 부모도 받을 수 있나요?</strong><br>A. 체류 자격과 거주 기간에 따라 가능합니다. 일반적으로 결혼이민자(F-6)나 영주권자(F-5)는 지원 대상이 될 수 있으니 주민센터에 문의하세요.</p>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 아이를 입양했을 때도 첫만남이용권을 받을 수 있나요?</strong><br>A. 네, 입양한 경우에도 첫만남이용권과 부모급여를 신청할 수 있습니다. 입양확정판결문이 필요합니다.</p>
    `,
  },
  {
    id: "15",
    title: "근로장려금 맞벌이 가구 신청 자격",
    slug: "earned-income-tax-credit-working-couple",
    date: "2026-04-10",
    summary: "맞벌이 가구의 근로장려금 산정 기준과 단독 가구와의 차이점을 설명합니다.",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=800&q=80",
    category: "세금·복지",
    readTime: "7분",
    content: `
      <p class="text-gray-700 leading-relaxed my-4">
        매달 열심히 일하고도 손에 남는 돈이 없다는 생각이 드시나요? 정부는 소득이 적지만 성실하게 일하는 근로자들을 위해 <strong>근로장려금(Earned Income Tax Credit, EITC)</strong>을 지급하고 있습니다. 이 제도는 마치 "일한 만큼 돌려받는 보너스"와 같습니다. 하지만 <strong>맞벌이 가구(부부가 모두 직장을 다니는 가구)</strong>의 경우, 단독 가구와는 다른 기준이 적용되어 헷갈리기 쉽습니다. 이 글에서는 맞벌이 가구가 근로장려금을 받기 위한 조건과 계산 방법, 신청 방법을 차근차근 설명합니다.
      </p>

      <img src="https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=800&q=80" alt="가계부와 계산기" class="w-full rounded-xl my-6 object-cover h-64">

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">1. 근로장려금이란? — 일하는 사람에게 주는 현금 보너스</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        근로장려금(EITC)은 소득이 낮은 근로자나 사업자에게 정부가 <strong>현금으로 지급</strong>하는 제도입니다. 이름에 "세금"이 들어가지만 세금을 내지 않아도 받을 수 있으며, 연말정산과는 별개로 <strong>매년 5월</strong>에 별도 신청해야 합니다.
      </p>
      <p class="text-gray-700 leading-relaxed my-4">
        이 제도의 목적은 "일한 사람에게 소득을 보전해주자"는 것입니다. 따라서 근로소득이 <strong>일정 수준 이상</strong>이어야 하고, 동시에 <strong>일정 수준 이하여야</strong> 합니다. 너무 많이 벌어도 안 되고, 너무 적게 벌어도(근로 의지가 없어 보이므로) 안 됩니다.
      </p>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <p class="text-blue-800"><strong>💡 꿀팁:</strong> 근로장려금은 <strong>연말정산 환급금과 별개</strong>입니다. 연말정산으로 세금을 돌려받았더라도 근로장려금을 추가로 받을 수 있습니다. 5월이 되면 꼭 홈택스를 확인하세요!</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">2. 가구 유형별 산정 기준 — 내 가구는 어디에 해당하나요?</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        근로장려금은 가구 구성원 수와 소득에 따라 지급액이 달라집니다. 먼저 자신의 가구가 어떤 유형인지 알아야 합니다.
      </p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>단독 가구:</strong> 혼자 사는 사람(배우자, 자녀가 없음)</li>
        <li><strong>단일 근로 가구(홑벌이):</strong> 부부 중 한 명만 근로소득이 있고 자녀가 있거나 없는 가구</li>
        <li><strong>맞벌이 가구(부부 쌍근로):</strong> 부부가 모두 근로소득이 있고(각자 월 300만 원 이상), 자녀가 있거나 없는 가구</li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">맞벌이 가구의 정의</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        근로장려금에서 "맞벌이"는 단순히 부부가 모두 일하는 것을 의미하지 않습니다. 배우자의 <strong>연간 근로소득이 300만 원 이상</strong>일 때만 맞벌이로 인정됩니다. 따라서 남편은 회사원이고 아내는 가끔 아르바이트로 200만 원을 벌었다면, 이는 <strong>단일 근로 가구</strong>로 분류됩니다.
      </p>

      <table class="w-full text-sm my-6 border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left border">가구 유형</th>
            <th class="p-3 text-left border">가구원 수</th>
            <th class="p-3 text-left border">총소득 기준(2026년)</th>
            <th class="p-3 text-left border">최대 지급액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border">단독 가구</td>
            <td class="p-3 border">1인</td>
            <td class="p-3 border">2,200만 원 이하</td>
            <td class="p-3 border"><strong>165만 원</strong></td>
          </tr>
          <tr>
            <td class="p-3 border">단일 근로(홑벌이)</td>
            <td class="p-3 border">2인</td>
            <td class="p-3 border">3,200만 원 이하</td>
            <td class="p-3 border"><strong>260만 원</strong></td>
          </tr>
          <tr>
            <td class="p-3 border">맞벌이(부부)</td>
            <td class="p-3 border">2인</td>
            <td class="p-3 border">3,800만 원 이하</td>
            <td class="p-3 border"><strong>260만 원</strong></td>
          </tr>
          <tr>
            <td class="p-3 border">맞벌이 + 자녀 1인</td>
            <td class="p-3 border">3인</td>
            <td class="p-3 border">4,400만 원 이하</td>
            <td class="p-3 border"><strong>300만 원</strong></td>
          </tr>
          <tr>
            <td class="p-3 border">맞벌이 + 자녀 2인</td>
            <td class="p-3 border">4인</td>
            <td class="p-3 border">4,800만 원 이하</td>
            <td class="p-3 border"><strong>330만 원</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
        <p class="text-amber-800"><strong>⚠️ 주의:</strong> 총소득 기준은 매년 변할 수 있습니다. 위 금액은 2026년 기준 예상액이며, 정확한 기준은 5월 국세청 공고를 통해 확인해야 합니다.</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">3. 자산 기준 — 집과 차도 따져봅니다</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        근로장려금은 소득뿐만 아니라 <strong>자산(재산)</strong>도 함께 검토합니다. 소득은 낮아도 집이나 땅, 차가 많으면 지원 대상에서 제외될 수 있습니다.
      </p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>부동산:</strong> 1주택은 기본적으로 제외되나, 고가 주택(시가 5억 원 이상 등)은 일부 포함될 수 있음</li>
        <li><strong>금융 자산:</strong> 예금, 적금, 주식, 채권 등의 합계</li>
        <li><strong>자동차:</strong> 승용차의 경우 출시 가격 기준 <strong>4,000만 원 이상</strong>인 경우 자산으로 포함</li>
        <li><strong>자산 한도:</strong> 가구별로 상이하나, 일반적으로 <strong>총 자산 2억 원 이하</strong>가 기준(지역 및 가구원 수에 따라 다름)</li>
      </ul>
      <p class="text-gray-700 leading-relaxed my-4">
        자산 기준은 지역(서울과 지방)과 가구원 수에 따라 달라집니다. 예를 들어 서울에 사는 3인 가구와 지방에 사는 3인 가구의 자산 기준은 다를 수 있습니다. 정확한 기준은 홈택스에서 확인하세요.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">4. 맞벌이 가구 계산 예시 — 직접 계산해 보기</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        실제 사례를 통해 맞벌이 가구의 근로장려금을 계산해 보겠습니다.
      </p>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">사례: 김철수·박영희 부부 (자녀 2명, 4인 가구)</h3>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li>남편(김철수) 연봉: <strong>2,500만 원</strong>(월평균 208만 원)</li>
        <li>아내(박영희) 연봉: <strong>2,000만 원</strong>(월평균 167만 원)</li>
        <li>가구 총소득: <strong>4,500만 원</strong></li>
        <li>자녀: 중학생 1명, 초등학생 1명</li>
        <li>자산: 아파트 1채(시가 3억 원), 자동차 1대(2,000만 원), 예금 3,000만 원</li>
      </ul>

      <p class="text-gray-700 leading-relaxed my-4">
        이 부부의 경우 가구원 수는 4인이며, 총소득은 4,500만 원입니다. 2026년 기준 4인 맞벌이 가구의 총소득 기준은 <strong>4,800만 원 이하</strong>이므로 소득 기준은 충족합니다. 자산도 기준 이내이므로 근로장려금 신청이 가능합니다.
      </p>
      <p class="text-gray-700 leading-relaxed my-4">
        총소득 4,500만 원은 기준 소득(4,800만 원)에 가까우므로, 최대 지급액인 330만 원보다는 적은 금액이 지급될 것입니다. 예상 지급액은 약 <strong>150~200만 원</strong> 선으로 추정됩니다. 정확한 금액은 근로장려금 계산기(홈택스 제공)로 확인할 수 있습니다.
      </p>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <p class="text-blue-800"><strong>💡 꿀팁:</strong> 홈택스(www.hometax.go.kr)에 접속하면 "근로장려금 사전계산" 서비스가 있습니다. 본인의 소득과 자산을 입력하면 예상 지급액을 확인할 수 있으니, 신청 전 꼭 이용해 보세요!</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">5. 신청 방법과 지급 일정</h2>
      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">신청 기간과 방법</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        근로장려금은 매년 <strong>5월</strong>에 일괄 신청받습니다. 2026년 지급분은 2026년 5월에 신청하며, 지급은 <strong>9월경</strong>에 이루어집니다.
      </p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>온라인(홈택스):</strong> www.hometax.go.kr 로그인 후 "근로장려금" 메뉴에서 신청</li>
        <li><strong>오프라인(주민센터):</strong> 주민등록상 주소지 관할 동 주민센터 방문</li>
        <li><strong>서류:</strong> 신분증, 가족관계증명서, 통장 사본, 소득 증빙(간소화 서비스로 대체 가능)</li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">지급 일정</h3>
      <p class="text-gray-700 leading-relaxed my-4">
        신청 후 국세청에서 소득과 자산을 조회·검증하는 과정을 거쳐, 보통 <strong>9월 중순~10월 초</strong>에 지급됩니다. 별도의 방문 없이 신청 시 기재한 <strong>본인 명의 통장</strong>으로 입금됩니다.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">6. 자녀 장려금(CTC)과의 차이점</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        근로장려금과 자녀 장려금(CTC)은 이름이 비슷해서 헷갈리기 쉽습니다. 두 제도의 차이점을 명확히 알아두면 필요한 혜택을 놓치지 않을 수 있습니다.
      </p>

      <table class="w-full text-sm my-6 border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left border">항목</th>
            <th class="p-3 text-left border">근로장려금(EITC)</th>
            <th class="p-3 text-left border">자녀 장려금(CTC)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border">대상</td>
            <td class="p-3 border">근로소득이 있는 가구</td>
            <td class="p-3 border">자녀를 양육하는 저소득 가구</td>
          </tr>
          <tr>
            <td class="p-3 border">신청 시기</td>
            <td class="p-3 border">매년 5월</td>
            <td class="p-3 border">매년 5월</td>
          </tr>
          <tr>
            <td class="p-3 border">소득 기준</td>
            <td class="p-3 border">단독 2,200만 원 ~ 맞벌이 4,800만 원</td>
            <td class="p-3 border">총소득 4,000만 원 이하</td>
          </tr>
          <tr>
            <td class="p-3 border">자산 기준</td>
            <td class="p-3 border">있음(총자산 한도)</td>
            <td class="p-3 border">없음(소득만 기준)</td>
          </tr>
          <tr>
            <td class="p-3 border">중복 수령</td>
            <td class="p-3 border" colspan="2">가능(조건 충족 시 두 가지 모두 받을 수 있음)</td>
          </tr>
        </tbody>
      </table>

      <p class="text-gray-700 leading-relaxed my-4">
        두 제도는 서로 <strong>중복 수령이 가능</strong>합니다. 따라서 맞벌이 가구라면 근로장려금을, 자녀가 있다면 자녀 장려금도 함께 신청하세요.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">7. 맞벌이 가구를 위한 주의사항과 꿀팁</h2>
      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">중요한 주의사항</h3>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>신청인은 부부 중 한 명만:</strong> 근로장려금은 가구당 한 명만 신청할 수 있습니다. 보통 소득이 더 적은 사람이 신청하면 가산 혜택을 받을 수 있습니다.</li>
        <li><strong>자산 포함 범위:</strong> 부동산, 자동차, 금융 자산을 모두 합산합니다. 부모님 명의로 된 재산은 제외되지만, 부부 공동 명의는 포함됩니다.</li>
        <li><strong>사업소득자도 가능:</strong> 직장인뿐만 아니라 개인사업자, 프리랜서도 신청할 수 있습니다. 다만 소득 증빙 방법이 다릅니다.</li>
        <li><strong>의무적으로 신고한 소득만 인정:</strong> 현금으로 받은 아르바이트 수입을 신고하지 않았다면 소득에 포함되지 않습니다.</li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">근로장려금을 최대화하는 꿀팁</h3>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li>소득이 기준선보다 약간 높다면, <strong>연금저축</strong>이나 <strong>주택청약</strong>을 통해 소득공제를 받아 총소득을 낮출 수 있습니다.</li>
        <li>신청자를 정할 때는 <strong>소득이 적은 배우자</strong>가 신청하는 것이 유리할 수 있습니다(일부 가구 유형에서 적용).</li>
        <li>매년 5월 신청 기간을 놓치지 않도록 <strong>휴대폰 알림</strong>을 설정하세요.</li>
        <li>홈택스에서 <strong>사전계산</strong>을 해보고, 예상 금액이 작더라도 신청하세요. 적은 금액도 생활비에 보탬이 됩니다.</li>
      </ul>

      <div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
        <p class="text-amber-800"><strong>⚠️ 주의:</strong> 근로장려금을 부정 수령하면 추후 국세청에서 <strong>환수(돌려달라고 요구)</strong>할 수 있습니다. 특히 자산을 허위로 신고하거나 소득을 숨긴 경우는 불이익을 받을 수 있으니 정확하게 신청하세요.</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">8. 자주 묻는 질문</h2>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 맞벌이 가구인데 배우자의 소득이 300만 원 미만이면 어떻게 되나요?</strong><br>A. 배우자의 근로소득이 300만 원 미만이면 <strong>단일 근로 가구</strong>로 분류됩니다. 이 경우 소득 기준이 더 낮아질 수 있으니, 단일 근로 기준으로도 계산해 보세요.</p>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 근로장려금을 받으면 다음 해 세금에 영향이 있나요?</strong><br>A. 근로장려금은 <strong>비과세 소득</strong>으로, 다음 해 소득에 포함되지 않습니다. 따라서 다음 해 근로장려금 신청에 영향을 주지 않습니다.</p>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 외국인 배우자가 있는 경우도 신청할 수 있나요?</strong><br>A. 배우자가 국내에 거주하고 있다면 가구원으로 포함됩니다. 다만 배우자의 소득도 총소득에 합산되므로 주의하세요.</p>
      <p class="text-gray-700 leading-relaxed my-4"><strong>Q. 근로장려금 신청을 거절당했는데 이의를 제기할 수 있나요?</strong><br>A. 네, 가능합니다. 국세청에 "이의신청"을 하거나, 필요한 경우 "심사청구"를 통해 다시 검토받을 수 있습니다.</p>
    `,
  },
  {
    id: "32",
    title: "2026 고유가(고환율·유가·고물가) 피해지원금 신청 완벽 가이드",
    slug: "2026-goyuga-pihae-support",
    date: "2026-05-21",
    summary: "고환율·유가·고물가(고유가)로 인한 서민층 삼중고를 완화하기 위한 2026년 피해지원금 신청 자격, 금액, 기간, 방법을 한눈에 정리했습니다.",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop&q=80",
    category: "welfare",
    readTime: "5분",
    content: `
      <p class="text-gray-700 leading-relaxed my-4">
        <strong>고유가(고환율·유가·고물가)</strong>로 인한 서민층의 삼중고를 완화하기 위해 정부가 <strong>고유가 피해지원금</strong>을 지급합니다. 소득 하위 70% 국민을 대상으로 1인당 최대 60만 원까지 지원되며, 지역사랑상품권·신용·체크카드·선불카드 중 선택하여 받을 수 있습니다. 이번 글에서는 신청 자격, 지원 금액, 신청 기간과 방법을 상세히 정리해 드립니다.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">1. 지원 개요</h2>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>추진 배경:</strong> 고유가·고환율·고물가로 인한 서민층의 삼중고 완화</li>
        <li><strong>지원 대상:</strong> 소득 하위 70% 국민(기초수급자·차상위·한부모 포함)</li>
        <li><strong>지원 금액:</strong> 1인당 10만 원 ~ 60만 원</li>
        <li><strong>지원 방식:</strong> 소득별·지역별 맞춤형 지원</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">2. 지원 금액 상세</h2>
      <p class="text-gray-700 leading-relaxed my-4">소득 계층과 거주 지역에 따라 지원 금액이 차등 지급됩니다.</p>
      <table class="min-w-full border-collapse border border-gray-300 text-sm my-6">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-3 border text-left">구분</th>
            <th class="p-3 border text-left">기초수급자</th>
            <th class="p-3 border text-left">차상위·한부모</th>
            <th class="p-3 border text-left">소득하위 70%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border font-semibold">수도권</td>
            <td class="p-3 border">55만 원</td>
            <td class="p-3 border">45만 원</td>
            <td class="p-3 border">10만 원</td>
          </tr>
          <tr>
            <td class="p-3 border font-semibold">비수도권</td>
            <td class="p-3 border">60만 원</td>
            <td class="p-3 border">50만 원</td>
            <td class="p-3 border">15만 원</td>
          </tr>
        </tbody>
      </table>
      <p class="text-gray-700 leading-relaxed my-4">
        <strong>인구감소지역 우대:</strong> 인구감소 우대지원지역은 20만 원, 특별지원지역은 25만 원이 추가 지원됩니다.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">3. 지급 수단</h2>
      <p class="text-gray-700 leading-relaxed my-4">수령자는 아래 수단 중 하나를 선택할 수 있습니다.</p>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>지역사랑상품권</strong></li>
        <li><strong>신용·체크카드</strong></li>
        <li><strong>선불카드</strong></li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">4. 신청 방법</h2>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>온라인:</strong> 카드사·지역사랑상품권 앱 및 홈페이지</li>
        <li><strong>오프라인:</strong> 주민센터, 은행 영업점 방문 신청</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">5. 신청·지급 기간</h2>
      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">기초수급자·차상위·한부모 가구</h3>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>1차:</strong> 2026년 4월 27일(월) ~ 2026년 5월 8일(금)</li>
        <li><strong>2차:</strong> 2026년 5월 18일(월) ~ 2026년 7월 3일(금)</li>
      </ul>
      <div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
        <p class="text-amber-800"><strong>※ 주의:</strong> 1차 기간에 신청·지급받은 경우 2차 기간에는 신청·지급이 불가합니다.</p>
      </div>

      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">소득 하위 70% (국민의 70%)</h3>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>2차:</strong> 2026년 5월 18일(월) ~ 2026년 7월 3일(금)</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">6. 사용 기한 및 범위</h2>
      <ul class="list-disc pl-5 space-y-2 my-4">
        <li><strong>사용 기한:</strong> 2026년 8월 31일(월)까지 ※ 1·2차 동일</li>
        <li><strong>사용 지역:</strong> 신청자 본인의 주소지(특·광역시 및 시·군)</li>
        <li><strong>사용처:</strong>
          <ul class="list-circle pl-5 space-y-1 mt-2">
            <li><strong>지역사랑상품권:</strong> 지역사랑상품권 가맹점</li>
            <li><strong>신용·체크카드·선불카드:</strong> 유흥·사행업종 등 &apos;사용불가 업종&apos;을 제외한 매출액 30억 원 이하 소상공인 매장</li>
          </ul>
        </li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">7. 문의처</h2>
      <p class="text-gray-700 leading-relaxed my-4">
        고유가 피해지원금 관련 문의는 <strong>고유가 피해지원금 전담 콜센터 1670-2626</strong>으로 연락하시기 바랍니다.
      </p>
    `,
  },
];
