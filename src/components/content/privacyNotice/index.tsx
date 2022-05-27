import React, { useEffect, useState } from 'react';
import { Typography, Table, Divider, Checkbox, Button, message } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
import { acceptLicenseAgreement } from '@/app/request/apiUser';
export default function index(props: any) {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (!check1 || !check2) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [check1, check2]);

  return (
    <div>
      <Typography>
        <Title level={5} style={{ textAlign: 'center' }}>
          用户隐私政策
        </Title>
        <Paragraph>最后更新时间：【 2021】年【12 】月【07 】日</Paragraph>
        <Paragraph>
          尊敬的【全国经销商采购和库存管理系统】的用户（以下简称“您”），我们，注册地址位于中国（上海）自由贸易试验区英伦路38号四层410、411、412室的【西门子医学诊断产品(上海)有限公司】（以下简称“西门子诊断”）希望通过本隐私政策帮助您了解您在使用西门子诊断提供的【全国经销商采购和库存管理系统】的过程中，西门子诊断如何处理您的个人信息以及您对于这些个人信息所享有的权利（“本隐私政策”）。
        </Paragraph>
        <Paragraph>本隐私政策将帮助您了解以下内容：</Paragraph>
        <Paragraph>
          <ol>
            <li>西门子诊断为何处理您的个人信息以及处理您个人信息的类别</li>
            <li>个人信息的委托处理、共享和披露</li>
            <li>个人信息的保护</li>
            <li>个人信息的保留期限</li>
            <li>未成年人的个人信息</li>
            <li>您的权利</li>
            <li>西门子诊断个人信息保护机构</li>
            <li>内容变更</li>
          </ol>
        </Paragraph>
        <Title level={5}>
          1. 西门子诊断为何处理您的个人信息以及处理您个人信息的类别
        </Title>
        <Paragraph>
          1.1.
          个人信息是以电子或者其他方式记录的与已识别或者可识别的自然人有关的各种信息，不包括匿名化处理后的信息。敏感个人信息是一旦泄露或者非法使用，容易导致自然人的人格尊严受到侵害或者人身、财产安全受到危害的个人信息，包括生物识别、宗教信仰、特定身份、医疗健康、金融账户、行踪轨迹等信息，以及不满十四周岁未成年人的个人信息。
          个人信息的处理包括个人信息的收集、存储、使用、加工、传输、提供、公开、删除等。
        </Paragraph>
        <Paragraph>
          1.2. 我们会出于以下目的收集和使用您的以下个人信息:
        </Paragraph>
        <Paragraph>
          <Table
            size="small"
            pagination={false}
            columns={[
              {
                title: '序号',
                dataIndex: 'index',
                align: 'center',
              },
              {
                title: '目的',
                dataIndex: 'target',
                align: 'center',
              },
              {
                title: '个人信息类别',
                dataIndex: 'category',
                align: 'center',
              },
            ]}
            dataSource={[
              {
                key: '1',
                index: '（1）',
                target: '帮助您注册为我们的用户',
                category: '您的手机号, 邮箱地址和验证码信息',
              },
            ]}
            bordered
          />
        </Paragraph>
        <Title level={5}>2. 个人信息的委托处理、共享和披露</Title>
        <Paragraph>2.1. 个人信息的委托处理</Paragraph>
        <Paragraph>
          为实现上述第1条所述之目的，西门子诊断有可能委托有关第三方（“委托处理方”）处理您的个人信息，比如系统提供商、数据处理服务提供商、云服务提供商。届时西门子诊断将要求该等第三方按照适用的法律法规的要求，采取相应的安全措施保护该等个人信息，并且该等保护应与西门子诊断采取的个人信息保护措施在程度上相当。
        </Paragraph>
        <Paragraph>2.2. 个人信息的共享</Paragraph>
        <Paragraph>
          为实现上述第1条所述之目的，西门子诊断有可能将您的个人信息提供给以下第三方：
        </Paragraph>
        <Paragraph>
          <Table
            size="small"
            pagination={false}
            columns={[
              {
                title: '序号',
                dataIndex: 'index',
                align: 'center',
              },
              {
                title: '被提供方',
                dataIndex: 'provided',
                align: 'center',
              },
              {
                title: '处理目的和方式',
                dataIndex: 'purpose',
                align: 'center',
              },
              {
                title: '所涉及的个人信息的种类',
                dataIndex: 'category',
                align: 'center',
              },
            ]}
            dataSource={[
              {
                key: '1',
                index: '1',
                provided: '西门子诊断有合作协议的商务伙伴',
                purpose: '通过用户名， 密码登录页面和处理跟踪订单',
                category: '联系方式和邮箱地址',
              },
            ]}
            bordered
          />
        </Paragraph>
        <Paragraph>
          此外，在适用法律法规允许或者要求的情况下，西门子诊断可能会将您的个人信息共享给有关第三方，比如：
        </Paragraph>
        <ul style={{ listStyleType: 'disc' }}>
          <li>
            西门子诊断全部或部分的业务的潜在资产收购方、或在西门子诊断并购、收购或股票公开发行中的收购方或者股权认购方以及其顾问；
          </li>
          <li>
            在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会在要求新的持有您个人信息的公司、组织继续依据本隐私政策所披露的内容处理您的个人信息。如新的持有您个人信息的公司、组织需要将您的个人信息用于本隐私政策未载明的目的，新的公司或组织将会依照可适用的法律法规的规定取得您的同意。
          </li>
          <li>
            与遵守法律义务或与提出、行使或抗辩法律诉求相关的第三方（例如为诉讼或仲裁程序，向执法机构、监管机构，向律师和顾问转让和/或共享）。
          </li>
        </ul>

        <Paragraph>2.3. 个人信息的披露</Paragraph>
        <Paragraph>
          <Text>西门子诊断可能会在如下的情形披露您的个人信息，比如：</Text>
        </Paragraph>
        <Paragraph>
          <ul style={{ listStyleType: 'disc' }}>
            <li>
              中国法律或者任何适用于西门子诊断的其他国家的法律要求进行披露；
            </li>
            <li>
              在中国法律或者任何适用于西门子诊断的其他国家的法律授权或允许的范围内，为保护西门子诊断的合法权利或者一个第三方的重大利益而进行披露；
            </li>
            <li>根据司法程序或政府主管部门的要求。</li>
          </ul>
        </Paragraph>
        <Paragraph>2.4. 个人信息存储</Paragraph>
        <Paragraph>
          西门子医疗会在中国境内使用、储存您的个人信息，您的个人信息不会存储在境外服务器或传输至境外。
        </Paragraph>
        <Title level={5}>3. 个人信息的保护</Title>
        <Paragraph>
          西门子诊断将会采取适当的技术措施和管理措施来保护您的个人信息不受未经授权的访问、修改、分发、披露或删除。
          <Text strong>
            请您知悉并理解，互联网并非绝对安全的环境。如您发现自己的个人信息发生泄漏的，请您立即通过本隐私政策下方列出的联系方式联系我们，以便我们采取相应措施。
          </Text>
        </Paragraph>
        <Title level={5}>4. 个人信息的保留期限</Title>
        <Paragraph>
          除非在收集您个人信息时另有约定，若保留信息已不再为个人信息收集或另行处理时的目的或为遵守法律义务所需要（例如税法或商业法下的法定保留义务），公司将删除您的个人信息。
        </Paragraph>
        <Paragraph>
          如您想主动要求相应删除，请联系全国经销商采购和库存管理系统的技术支持服务邮箱
          <Link>xikui.pang@medalsoft.com</Link>
          。如届时法律、行政法规规定的保存期限未届满，或者删除个人信息从技术上难以实现的，西门子诊断应当停止除存储和采取必要的安全保护措施之外的处理。
        </Paragraph>
        <Title level={5}>5. 未成年人的个人信息</Title>
        <Paragraph>
          我们的服务主要面向年满18周岁的成年人提供，我们一般不直接从未成年人收集其个人信息。
          <Text strong>
            如果您认为我们未经过您同意处理了您的未成年子女的个人信息，或者对我们处理您的未成年子女的个人信息有任何问题或者疑虑，请通过本隐私政策底部所示的联系方式与我们联系。
          </Text>
        </Paragraph>
        <Title level={5}>6. 您的权利</Title>
        <Paragraph>受制于相关法律要求，您可能有权：</Paragraph>
        <Paragraph>
          <ul style={{ listStyleType: 'disc' }}>
            <li>
              与西门子诊断确认其是否正在处理与您有关的个人信息，并且若在处理的话，您可以访问该个人信息;{' '}
            </li>
            <li>借助西门子诊断更正有关您的不准确的个人信息；</li>
            <li>借助西门子诊断删除您的个人信息；</li>
            <li>
              撤销您的同意，但该等撤销不影响基于您的同意已经做出的合法处理行为。
            </li>
            <li>借助西门子诊断限制对您的个人信息的处理；</li>
            <li>获得您的个人信息的副本；</li>
            <li>以您的特定情况为理由反对进一步处理与您有关的个人信息。</li>
          </ul>
        </Paragraph>
        <Paragraph>
          {' '}
          <Text strong>
            请您注意，在中国法律允许的情况下，如果西门子诊断无法或在实际操作上难以按照您的上述要求行事，西门子诊断有权拒绝您的全部或部分请求，并仅需于合理时间内向您说明拒绝理由。特别是，西门子诊断有权在中国法律允许的情况下在下列任一情形下拒绝您的请求：
          </Text>
        </Paragraph>
        <Paragraph>
          <ul style={{ listStyleType: 'disc' }}>
            <li>所请求信息是与西门子诊断履行法律法规义务直接相关的； </li>
            <li>所请求信息是与国家安全、国防安全直接相关的；</li>
            <li>所请求信息是与公共安全、公共卫生、重大公共利益直接相关的；</li>
            <li>所请求信息是与犯罪侦查、起诉、审判和执行判决等直接相关的；</li>
            <li>西门子诊断有合理证据表明您存在主观恶意或滥用权利的；</li>
            <li>
              响应您的请求将导致您或其他个人、实体或组织的合法权益受到损害的；
            </li>
            <li>
              出于维护您或其他自然人的生命、财产等重大合法权益但又很难得到您的同意的
            </li>
            <li>所请求信息涉及商业秘密。</li>
          </ul>
        </Paragraph>
        <Title level={5}>7. 西门子诊断个人信息保护机构</Title>
        <Paragraph>
          西门子诊断个人信息保护机构为任何个人信息保护有关的问题、意见、疑虑或投诉提供支持，也可在您希望行使任何与个人信息保护相关的权利时提供支持。您可以通过联系以下邮箱获取关于西门子诊断个人信息保护机构、西门子诊断个人信息保护体系的信息或寻求支持：
          <Link>dataprivacy.func@siemens-healthineers.com</Link>
        </Paragraph>
        <Paragraph>
          西门子诊断个人信息保护机构会尽商业合理可行的努力回应、解决收到的问题和投诉。除联系西门子诊断个人信息保护机构，您也可能有权向相应个人信息保护主管机关反映您的问题或投诉。
        </Paragraph>
        <Title level={5}>8. 内容变更</Title>
        <Paragraph>
          西门子诊断有权修订本告知函的内容，当（发生）更新时，我们会在西门子诊断的网站以及我们认为合适的其他地方公布变更内容，并以口头、书面、电话、短信、电子邮件、传真、电子文档等方式向您提供修订概要。以确保您始终了解我们收集了哪些信息、如何使用以及我们在何种情况下（如果有）会分享或公开这些信息。
        </Paragraph>
        <Paragraph>
          您可以通过本隐私政策的“最后更新时间”了解到本隐私政策的更新时间。
        </Paragraph>
      </Typography>
      <Divider />
      <Paragraph>
        <Checkbox
          onChange={(value) => {
            setCheck1(value.target.checked);
          }}
        >
          本人理解并同意西门子诊断根据《用户隐私政策》对本人个人信息的处理行为。
        </Checkbox>
      </Paragraph>
      <Paragraph>
        <Checkbox
          onChange={(value) => {
            setCheck2(value.target.checked);
          }}
        >
          本人理解并同意，为了《用户隐私政策》所列目的，我的个人信息（在与各目的相关的范围内）可能被转移给西门子诊断的关联公司、其他第三方（包括公司的代理商、服务提供商、客户、供应商、审计人员等）、政府部门、司法部门等接收方。
        </Checkbox>
      </Paragraph>
      <div
        style={{
          textAlign: 'center',
          position: 'absolute',
          bottom: '24px',
          right: '0',
          zIndex: 999,
          width: '1000px',
          backgroundColor: '#fff',
        }}
      >
        <Button
          disabled={disabled}
          style={{ width: '80px' }}
          type="primary"
          onClick={async () => {
            const re = await acceptLicenseAgreement(null, props.routePath);
            if (re.isSuccess) {
              // 关闭modal
              props.hideModal();
            } else {
              message.error(re.msg);
            }
          }}
        >
          {' '}
          确认
        </Button>
      </div>
    </div>
  );
}
