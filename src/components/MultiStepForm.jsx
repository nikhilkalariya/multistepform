

import { useState } from 'react';
import { Form, Input, Button, Checkbox, Radio, Steps, Divider, message } from 'antd';
import { UserOutlined, MailOutlined,SettingFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Step } = Steps;

const MultiStepForm = ({ onSubmit }) => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    services: [],
    budget: '',
  });
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleCheckboxChange = (checkedValues) => {
    setFormData({ ...formData, services: checkedValues });
  };

  const steps = [
    {
      
      content: (
        <Form
          layout="vertical"
          form={form}
          initialValues={formData}
          onFinish={() => setCurrent(current + 1)}
        >
          <div className='my-5'>
            <div className='text-2xl font-bold'>Contact Details</div>
            <p className='text-lg text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <Form.Item
            className='text-lg font-semibold'
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input
              className='border border-gray-50 text-gray-900 text-sm rounded-3xl w-full p-3 shadow-lg'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              size="large"
              placeholder="Name"
              suffix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            className='text-lg font-semibold'
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input
              className='border border-gray-50 text-gray-900 text-sm rounded-3xl w-full p-3 shadow-lg'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              size="large"
              placeholder="Email address"
              suffix={<MailOutlined />}
            />
          </Form.Item>
        </Form>
      ),
    },
    {
    
      content: (
        <Form
          layout="vertical"
          form={form}
          initialValues={formData}
          onFinish={() => setCurrent(current + 1)}
        >
          <div className='my-5'>
            <div className='text-2xl font-bold'>Our Services</div>
            <p className='text-lg text-gray-500'>Please select which service you are interested in.</p>
          </div>
          <Form.Item
            name="services"
            rules={[{ required: true, message: 'Please select at least one service' }]}
          >
            <Checkbox.Group
              className='grid grid-cols-2 gap-2'
              value={formData.services}
              onChange={handleCheckboxChange}
            >
              <Checkbox className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500 w-full p-5' value="Development">Development</Checkbox>
              <Checkbox className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500  w-full p-5' value="Marketing">Marketing</Checkbox>
              <Checkbox className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500 w-full p-5' value="WebDesign">WebDesign</Checkbox>
              <Checkbox className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500 w-full p-5' value="Other"><SettingFilled className='bg-indigo-500 p-2 rounded-full fill-white mx-4'/>Other</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          
        </Form>
      ),
    },
    {
     
      content: (
        <Form
          layout="vertical"
          form={form}
          initialValues={formData}
          onFinish={() => handleSubmit()}
        >
          <div className='my-5'>
            <div className='text-2xl font-bold'>Whats your Budget?</div>
            <p className='text-lg text-gray-500'>Please select the project budget range you have in mind</p>
          </div>
          <Form.Item
            name="budget"
            rules={[{ required: true, message: 'Please select a budget' }]}
          >
            <Radio.Group
              className='grid grid-cols-2 gap-x-4 gap-y-4'
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            >
              <Radio className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500 block w-full p-5' value="$5,000-$10,000">$5,000 - $10,000</Radio>
              <Radio className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500 block w-full p-5' value="$10,000-$20,000">$10,000 - $20,000</Radio>
              <Radio className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500 block w-full p-5' value="$20,000-$50,000">$20,000 - $50,000</Radio>
              <Radio className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500 block w-full p-5' value="$50,000+">$50,000+</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ),
    },
  ];

  const next = async () => {
    try {
      await form.validateFields();
      setCurrent(current + 1);
    } catch (error) {
      message.error('Please fill out the required fields');
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      onSubmit(formData);
      // Reset the form data after submission (optional)
      setFormData({
        name: '',
        email: '',
        services: [],
        budget: '',
      });
      setCurrent(0);
      navigate('/result'); // Navigate to the result page after form submission
    } catch (error) {
      message.error('Please fill out the required fields');
    }
  };

  return (
    <>
      <div className='flex flex-col justify-stretch flex-grow items-center'>
        <div className='flex flex-col justify-center items-center m-5 w-2/4'>
          <h1 className='text-3xl text-center font-bold'>Get a project quote</h1>
          <p className='mt-2 text-xl text-center text-gray-500'>Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.</p>
        </div>
        <div className='flex flex-col gap-4 justify-around shadow-2xl w-2/4 rounded-xl p-10'>
          <div>
            <Steps current={current}>
              {steps.map((item, index) => (
                <Step key={index} title={item.title} />
              ))}
            </Steps>
            <Divider className='my-5' />
          </div>
          <div className="steps-content">{steps[current].content}</div>
        </div>
        <div className="steps-action flex justify-between my-5 w-2/4">
          {current > 0 && (
            <Button className='p-5' onClick={prev} shape="round">
              Previous step
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button className='p-5' type="primary" onClick={next} shape="round">
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button className='p-5' type="primary" onClick={handleSubmit} shape="round">
              Submit
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
 export default MultiStepForm;
// import { useState } from 'react';
// import { Form, Input, Button, Checkbox, Radio, Steps, Divider, message } from 'antd';
// import { UserOutlined, MailOutlined, SettingFilled } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

// const { Step } = Steps;

// const MultiStepForm = ({ onSubmit }) => {
//   const [current, setCurrent] = useState(0);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     services: [],
//     budget: '',
//   });
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   const handleCheckboxChange = (checkedValues) => {
//     setFormData({ ...formData, services: checkedValues });
//   };

//   const steps = [
//     {
//       content: (
//         <Form
//           layout="vertical"
//           form={form}
//           initialValues={formData}
//           onFinish={() => setCurrent(current + 1)}
//         >
//           <div className='my-5'>
//             <div className='text-2xl font-bold'>Contact Details</div>
//             <p className='text-lg text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
//           </div>
//           <Form.Item
//             className='text-lg font-semibold'
//             label="Name"
//             name="name"
//             rules={[{ required: true, message: 'Please enter your name' }]}
//           >
//             <Input
//               className='border border-gray-50 text-gray-900 text-sm rounded-3xl w-full p-3 shadow-lg'
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               size="large"
//               placeholder="Name"
//               suffix={<UserOutlined />}
//             />
//           </Form.Item>
//           <Form.Item
//             className='text-lg font-semibold'
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, message: 'Please enter your email' },
//               { type: 'email', message: 'Please enter a valid email' }
//             ]}
//           >
//             <Input
//               className='border border-gray-50 text-gray-900 text-sm rounded-3xl w-full p-3 shadow-lg'
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               size="large"
//               placeholder="Email address"
//               suffix={<MailOutlined />}
//             />
//           </Form.Item>
//         </Form>
//       ),
//     },
//     {
//       content: (
//         <Form
//           layout="vertical"
//           form={form}
//           initialValues={formData}
//           onFinish={() => setCurrent(current + 1)}
//         >
//           <div className='my-5'>
//             <div className='text-2xl font-bold'>Our Services</div>
//             <p className='text-lg text-gray-500'>Please select which service you are interested in.</p>
//           </div>
//           <Form.Item
//             name="services"
//             rules={[{ required: true, message: 'Please select at least one service' }]}
//           >
//             <Checkbox.Group
//               className='grid grid-cols-2 gap-2'
//               value={formData.services}
//               onChange={handleCheckboxChange}
//             >
//               <Checkbox className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500 w-full p-5' value="Development">Development</Checkbox>
//               <Checkbox className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500  w-full p-5' value="Marketing">Marketing</Checkbox>
//               <Checkbox className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500 w-full p-5' value="WebDesign">WebDesign</Checkbox>
//               <Checkbox className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500 w-full p-5' value="Other"><SettingFilled className='bg-indigo-500 p-2 rounded-full fill-white mx-4'/>Other</Checkbox>
//             </Checkbox.Group>
//           </Form.Item>
//         </Form>
//       ),
//     },
//     {
//       content: (
//         <Form
//           layout="vertical"
//           form={form}
//           initialValues={formData}
//           onFinish={() => handleSubmit()}
//         >
//           <div className='my-5'>
//             <div className='text-2xl font-bold'>Whats your Budget?</div>
//             <p className='text-lg text-gray-500'>Please select the project budget range you have in mind</p>
//           </div>
//           <Form.Item
//             name="budget"
//             rules={[{ required: true, message: 'Please select a budget' }]}
//           >
//             <Radio.Group
//               className='grid grid-cols-2 gap-x-4 gap-y-4'
//               value={formData.budget}
//               onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
//             >
//               <Radio className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500 block w-full p-5' value="$5,000-$10,000">$5,000 - $10,000</Radio>
//               <Radio className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500 block w-full p-5' value="$10,000-$20,000">$10,000 - $20,000</Radio>
//               <Radio className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500 block w-full p-5' value="$20,000-$50,000">$20,000 - $50,000</Radio>
//               <Radio className='bg-white border border-gray-300 text-base rounded-lg hover:ring-2 hover:ring-blue-500 hover:border-blue-500 block w-full p-5' value="$50,000+">$50,000+</Radio>
//             </Radio.Group>
//           </Form.Item>
//         </Form>
//       ),
//     },
//   ];

//   const next = async () => {
//     try {
//       await form.validateFields();
//       setCurrent(current + 1);
//     } catch (error) {
//       message.error('Please fill out the required fields');
//     }
//   };

//   const prev = () => {
//     setCurrent(current - 1);
//   };

//   const handleSubmit = async () => {
//     try {
//       await form.validateFields();
//       const json = JSON.stringify(formData, null, 2);
//       const blob = new Blob([json], { type: 'application/json' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'formData.json';
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);

//       // Reset the form data after submission (optional)
//       setFormData({
//         name: '',
//         email: '',
//         services: [],
//         budget: '',
//       });
//       setCurrent(0);
//       navigate('/result'); // Navigate to the result page after form submission
//     } catch (error) {
//       message.error('Please fill out the required fields');
//     }
//   };

//   return (
//     <>
//       <div className='flex flex-col justify-stretch flex-grow items-center'>
//         <div className='flex flex-col justify-center items-center m-5 w-2/4'>
//           <h1 className='text-3xl text-center font-bold'>Get a project quote</h1>
//           <p className='mt-2 text-xl text-center text-gray-500'>Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.</p>
//         </div>
//         <div className='flex flex-col gap-4 justify-around shadow-2xl w-2/4 rounded-xl p-10'>
//           <div>
//             <Steps current={current}>
//               {steps.map((item, index) => (
//                 <Step key={index} title={item.title} />
//               ))}
//             </Steps>
//             <Divider className='my-5' />
//           </div>
//           <div className="steps-content">{steps[current].content}</div>
//         </div>
//         <div className="steps-action flex justify-between my-5 w-2/4">
//           {current > 0 && (
//             <Button className='p-5' onClick={prev} shape="round">
//               Previous step
//             </Button>
//           )}
//           {current < steps.length - 1 && (
//             <Button className='p-5' type="primary" onClick={next} shape="round">
//               Next
//             </Button>
//           )}
//           {current === steps.length - 1 && (
//             <Button className='p-5' type="primary" onClick={handleSubmit} shape="round">
//               Submit
//             </Button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MultiStepForm;
