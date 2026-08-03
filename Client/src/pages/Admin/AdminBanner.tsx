import React, { useState, useEffect } from 'react';
import { useAdminBanners } from './AdminBanner.logic';
import { Button } from 'shared-ui/components/Button/Button';
import { Modal } from 'shared-ui/components/Modal/Modal';
import { Table } from 'shared-ui/components/Table/Table';
import './AdminBanner.css';

export const AdminBanner: React.FC = () => {
  const {
    banners,
    loading,
    showModal,
    editingBanner,
    formData,
    totalPages,
    currentPage,
    handlePageChange,
    handleCreate,
    handleEdit,
    handleDelete,
    handleToggleStatus,
    handleSubmit,
    handleCloseModal,
    handleInputChange
  } = useAdminBanners();

  return (
    <div className="admin-banner-container">
      <div className="admin-banner-header">
        <h1 className="text-2xl font-bold text-gray-900">Banner Management</h1>
        <Button onClick={handleCreate} variant="primary">
          Create New Banner
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
            <Table
              columns={[
                { key: 'title', label: 'Title' },
                { key: 'position', label: 'Position' },
                { key: 'sortOrder', label: 'Order' },
                {
                  key: 'isActive',
                  label: 'Status',
                  render: (value: boolean) => (
                    <span className={`px-2 py-1 rounded-full text-xs ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {value ? 'Active' : 'Inactive'}
                    </span>
                  )
                },
                {
                  key: 'actions',
                  label: 'Actions',
                  render: (_: any, row: any) => (
                    <div className="flex gap-2">
                      <Button size="small" onClick={() => handleEdit(row)}>Edit</Button>
                      <Button 
                        size="small" 
                        variant={row.isActive ? 'warning' : 'success'}
                        onClick={() => handleToggleStatus(row._id, !row.isActive)}
                      >
                        {row.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button size="small" variant="danger" onClick={() => handleDelete(row._id)}>
                        Delete
                      </Button>
                    </div>
                  )
                }
              ]}
              data={banners}
            />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                size="small"
              >
                Previous
              </Button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                size="small"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingBanner ? 'Edit Banner' : 'Create New Banner'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Image URL</label>
            <input
              type="url"
              name="mobileImageUrl"
              value={formData.mobileImageUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Link URL</label>
            <input
              type="url"
              name="linkUrl"
              value={formData.linkUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Link Text</label>
            <input
              type="text"
              name="linkText"
              value={formData.linkText}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="home">Home</option>
              <option value="category">Category</option>
              <option value="product">Product</option>
              <option value="checkout">Checkout</option>
              <option value="sidebar">Sidebar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sort Order</label>
            <input
              type="number"
              name="sortOrder"
              value={formData.sortOrder}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingBanner ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

